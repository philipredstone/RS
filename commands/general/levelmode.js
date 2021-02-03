const { Command } = require('discord-akairo');

class LevelModeCommand extends Command {
    constructor() {
        super('levelmode', {
            aliases: ['levelmode'],
            args: [
                {
                    id: 'levelmode'
                }
            ],
            description: "Set level mode. \n   Usage: `###levelmode <silent|normal>`"
        });
    }

    async exec(message, args) {
        message.delete();

        const error = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Level-System: Error')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const success = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Level-System')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const noPerms = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Error: Invalid Permissions.')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
            
        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(noPerms);
        if(args.levelmode == "silent") {
            message.guild.set('levelmode', 'silent')
            return message.channel.send(success.setDescription('Level-Mode changed to: `silent`'));
        } else if (args.levelmode == "normal") {
            message.guild.set('levelmode', 'normal')
            return message.channel.send(success.setDescription('Level-Mode changed to: `normal`'));
        } else {
            return message.channel.send(error.setDescription('Given Mode not detected. Usage: `levelmode <silent|normal>`'));
        }
        
    }
}

module.exports = LevelModeCommand;
