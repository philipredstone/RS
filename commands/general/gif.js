const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class GifCommand extends Command {
    constructor() {
        super('meme', {
            aliases: ['meme'],
            description: 'Returns you a random meme!'
        });
    }

    async exec(message) {
        message.delete();
        let last_id = '';
        loadMeme(Math.floor(Math.random() * 10000), message);

        async function loadMeme(number, message) {
            let numbers = number > 100 ? number / 100 : 2;
            for (let index = 0; index < numbers; index++) {
                let extension = last_id != '' ? '&after=' + last_id : '';
                let url =
                    'https://www.reddit.com/r/meme.json?limit=100' + extension;
                fetch(url, { method: 'GET' })
                    .then(response => response.json())
                    .then(result =>
                        callback(result['data']['children'][100]['data']['name'])
                    )
                    .catch(error => console.log('error', error));
            }
            fetch('https://www.reddit.com/r/meme.json?limit=100' + last_id, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(result =>
                    message.channel.send(
                        result['data']['children'][Math.floor(Math.random() * 100)]['data']['url']
                    )
                )
                .catch(error => console.log('error', error));
        }

        function callback(id) {
            last_id = id;
        }
    }
}

module.exports = GifCommand;
