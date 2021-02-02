const { Command } = require('discord-akairo');
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )
const queue = new Map();

class MusicCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play','stop','skip'],
            description: "Music Commands \n   Usage: `###play <YouTube link>`"
        });
    }
    async exec(message) {
        message.delete();
        const error = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Music-Bot: Error')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const success = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Music-Bot')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            if (!song) {
              serverQueue.voiceChannel.leave();
              queue.delete(guild.id);
              return;
            }
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url))
                .on("finish", () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on("error", error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            message.channel.send(success.setDescription(`Start playing: **${song.title}**`).setThumbnail(song.image));
        }
        function skip(message, serverQueue) {
            if (!message.member.voice.channel)
              return message.channel.send(error.setDescription("You have to be in a voice channel to skip music!"));
            if (!serverQueue)
              return message.channel.send(error.setDescription("There is no song that I could skip!"));
            serverQueue.connection.dispatcher.end();
        }
        function stop(message, serverQueue) {
            if (!message.member.voice.channel)
              return message.channel.send(error.setDescription("You have to be in a voice channel to stop the music!"));
            if (!serverQueue)
              return message.channel.send(error.setDescription("There is no song that I could stop!"));    
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        } 
        const serverQueue = queue.get(message.guild.id);
        const args = message.content.split(" ");
        if(args[0] == this.client.commandHandler.prefix(message)+"stop") {
            stop(message, serverQueue);
        } else if(args[0] == this.client.commandHandler.prefix(message)+"skip") {
            skip(message, serverQueue);
        } else {
            let voiceChannel;
            try {
                voiceChannel = this.client.channels.cache.get(message.guild.voiceStates.cache.get(message.author.id).channelID)
            } catch (err) {
                return message.channel.send(error.setDescription("You have to be in a voice channel to play music!"));
            }
            if(!args[1])
                return message.channel.send(error.setDescription("Please specify a YouTube link!"));

            
            let song = {
                title: "",
                url: "",
            };
            if(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(args[1])) {
                const url = args[1].split("?v=");
                const video = await yts( { videoId: url[1] } )
                song = {
                    title: video.title,
                    url: video.url,
                    image: video.thumbnail,
                };
            } else {
                const r = await yts(args.join(" "))
                const videos = r.videos.slice(0,1)
                song = {
                    title: videos[0].title,
                    url: videos[0].url,
                    image: videos[0].thumbnail,
                };
            }
            if (!serverQueue) {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };
                queue.set(message.guild.id, queueContruct);
                queueContruct.songs.push(song);
                try {
                    let connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.channel.send(success.setDescription(`${song.title} has been added to the queue!`));
            }
        }
    }
}


module.exports = MusicCommand;