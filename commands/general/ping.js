const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: "Checks the Bot's ping"
        });
    }

    async exec(message) {
        message.delete();
        return message.channel.send(`Latency: **\`${this.client.ws.ping}ms\`**`)
    }
}

module.exports = PingCommand;
