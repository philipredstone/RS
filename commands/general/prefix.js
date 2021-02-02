const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            args: [
                {
                    id: 'prefix'
                }
            ],
            channel: 'guild',
            description: "Changes the Bot's Server specific prefix \n   Usage: `###prefix <new prefix>`"
        });
    }

    async exec(message, args) {
        message.delete();
        const prefix = message.guild.prefix;
        const currentPrefix = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Current Prefix: '+prefix)
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const noPerms = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Error: Invalid Permissions.')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const noChange = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Error: '+args.prefix+' is already the current prefix.')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const changed = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Success: Prefix changed to: ' + args.prefix)
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        if (!args.prefix)
            return message.channel.send(currentPrefix);

        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(noPerms);

        if (prefix === args.prefix)
            return message.channel.send(noChange);

        message.guild.set(`prefix`, args.prefix);
        return message.channel.send(changed);
    }
}

module.exports = PrefixCommand;
