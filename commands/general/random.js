const { Command } = require('discord-akairo');

class RandomCommand extends Command {
    constructor() {
        super('rand', {
            aliases: ['rand'],
            description: "Random Number between 0 and the given upper bound. \n   Usage: `###rand <upper bound>`"
        });
    }

    async exec(message) {
        message.delete();
        let number = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim();
        const randomNumber = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Random number between 0 and '+number)
            .setDescription('```js\n\n'+Math.floor(Math.random() * Math.floor(number))+'```')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const notNumber = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('Error: `'+number+'` is not a number!')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        if(/^\d+$/.test(number)) {
            return message.channel.send(randomNumber);
        } else {
            return message.channel.send(notNumber);
        }
    }
}

module.exports = RandomCommand;
