const { Command } = require('discord-akairo');

class VoicelockCommand extends Command {
    constructor() {
        super('lock', {
            aliases: ['lock'],
            description: "Locks your current voice channel."
        });
    }
    async exec(message) {
        message.delete();

        
        const error = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Voicelock: Error')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const success = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Voicelock:')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())

        let channelID = message.guild.voiceStates.cache.get(message.author.id).channelID;
        let voiceChannel = this.client.channels.cache.get(channelID)//this.client.channels.cache.get()

        if(voiceChannel.userLimit != 0) {
            if(message.guild.get(channelID) == "locked") {
                message.guild.set(channelID, 'unlocked')
                voiceChannel.setUserLimit(0)
                return message.channel.send(success.setDescription('Unlocked channel: `'+voiceChannel.name+'`'))
            } else {
                return message.channel.send(error.setDescription('Cannot unlock non user locked channel!'))
            }
        } else {
            message.guild.set(channelID, 'locked')
            voiceChannel.setUserLimit(voiceChannel.members.size)
            return message.channel.send(success.setDescription('Locked channel: `'+voiceChannel.name+'`'))
        }
            

    
    }
}

module.exports = VoicelockCommand;
