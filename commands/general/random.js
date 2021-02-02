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
        let channel = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim();
        return message.channel.send(Math.floor(Math.random() * Math.floor(channel)));
    }
}

module.exports = RandomCommand;
