const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class GifCommand extends Command {
    constructor() {
        super('gif', {
            aliases: ['gif', 'meme'],
            description: 'Returns you a gif \n   Usage: `###<gif|meme> <search>`'
        });
    }

    search(input) {
        return new Promise(function (res, rej) {
            if (!input) rej('[Error] Missing Input');
            fetch("https://api.giphy.com/v1/gifs/search?q="+input.content+"&api_key=M6MBI02GaH7SYFVuHVCJcq99ZSpm50uY&limit=1", {
                method: 'GET'
            })
                .then(res => res.json())
                .then(body => {
                    res(body.data[0].images.original.url)
                })
                .catch(e => rej(e));
        });
    }

    async exec(message) {
        message.delete();
        message.channel.send(await this.search(message));
    }
}

module.exports = GifCommand;