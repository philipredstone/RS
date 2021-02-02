const { Command } = require('discord-akairo');

class BotCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'stats'],
            description: "Get Basic Information about the Server."
        });
    }

    async exec(message) {
        message.delete();

        const embed = this.client.util
            .embed()
            .setColor(0xDDD57A)
            .setTitle('Information about `'+ message.guild.name+"`")
            .setDescription(`Member Count: \`${message.guild.memberCount}\`\nCurrent Prefix: \`${message.guild.prefix}\``)
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        
        return message.channel.send(embed);
    }
}

module.exports = BotCommand;
