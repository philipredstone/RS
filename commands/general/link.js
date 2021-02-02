const { Command } = require('discord-akairo');


class LinkCommand extends Command {
    constructor() {
        super('link', {
            aliases: ['link', 'to'],
            description: "Link two different channels for easy channel switching. \n   Usage: `###<link|to> <channel>`"
        });
    }

    async exec(message) {
        message.delete();
        let channel;
        if(message.content.includes("link")) {
            channel = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim();
        } else {
            channel = message.content.slice(this.client.commandHandler.prefix(message).length + 2).trim();
        }
        const to = this.client.util
            .embed()
            .setTitle('Channel Link')
            .addField('Origin: ','<#' + message.channel.id + '>')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const m = await this.client.channels.cache.get(channel.substr(2).slice(0, -1)).send(to);

        const from = this.client.util
            .embed()
            .setTitle('Channel Link')
            .addField('Destination: ',`[#${this.client.channels.cache.get(channel.substr(2).slice(0, -1)).name}](https://discordapp.com/channels/${message.guild.id}/${channel.substr(2).slice(0, -1)}/${m.id})`)
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const m2 = await message.channel.send(from);

        const toEdit = this.client.util
            .embed()
            .setTitle('Channel Link')
            .addField('Origin: ',`[#${message.channel.name}](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${m2.id})`)
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())

        return m.edit(toEdit)
    }
}

module.exports = LinkCommand;










/*
        message.delete();
        let {guild} = message;
        const firstEmbed = new Discord.MessageEmbed()
            .setTitle('Channel Link')
            .addField('Origin: ','<#' + message.channel.id + '>')
            .setFooter("Requested by " + message.member.user.tag);

        const m = await client.channels.cache.get(args[0].substr(2).slice(0, -1)).send(firstEmbed);


        const secondEmbed = new Discord.MessageEmbed()
            .setTitle('Channel Link')
            .addField('Destination: ',`[#${client.channels.cache.get(args[0].substr(2).slice(0, -1)).name}](https://discordapp.com/channels/${guild.id}/${args[0].substr(2).slice(0, -1)}/${m.id})`)
            .setFooter("Requested by " + message.member.user.tag);

        const m2 = await message.channel.send(secondEmbed)


        const thirdEmbed = new Discord.MessageEmbed()
            .setTitle('Channel Link')
            .addField('Origin: ',`[#${message.channel.name}](https://discordapp.com/channels/${guild.id}/${message.channel.id}/${m2.id})`)
            .setFooter("Requested by " + message.member.user.tag);

        m.edit(thirdEmbed)*/