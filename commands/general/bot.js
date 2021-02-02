const { Command } = require('discord-akairo');

class InfoCommand extends Command {
    constructor() {
        super('bot', {
            aliases: ['bot'],
            description: "Get Basic Information about the Bot."
        });
    }

    async exec(message) {
        message.delete();

        const lines = [
            `Commands Loaded: \`${this.client.commandHandler.modules.size}\``,
            `Command Aliases: \`${this.client.commandHandler.aliases.size}\``,
            `Guilds: \`${this.client.guilds.cache.size}\``,
            `Users: \`${this.client.guilds.cache.reduce((c, v) => c + v.memberCount, 0)}\``,
            `Add this bot to your server: [Link](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot)`
        ]
        
        
        const embed = this.client.util
           .embed()
           .setColor(0xDDD57A)
           .setTitle('Information about '+this.client.user.tag)
           .setDescription(lines.join('\n'))
           .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        
        return message.channel.send(embed);
    }
}

module.exports = InfoCommand;
