const { Command } = require('discord-akairo');
require('dotenv').config();

const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI(process.env.WOLFRAM_ALPHA_APPID);


class WolframCommand extends Command {
    constructor() {
        super('wolfram', {
            aliases: ['wolfram'],
            channel: 'guild',
            description: "Use wolfram to answer your math related questions \n   Usage: `###wolfram <query>`"
        });
    }

    async exec(message) {
        message.delete()

        const args = message.content.split(" ");
        args.shift()
        let data = await waApi.getFull(args.join(' '))
        let embeds = [];

        if(!data.pods) {

            const error = this.client.util
                .embed()
                .setColor(0xd92929)
                .setTitle('Wolfram: Error')
                .setDescription('No result for: `'+args.join(' ')+'`')
                .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
            return message.channel.send(error);
        } else {

            embeds.push(this.client.util
                .embed()
                .setColor(0x29d65d)
                .setTitle('Wolfram: '+data.pods[0].subpods[0].plaintext)
                .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL()))

            data.pods.slice(1).forEach(pod => {
                pod.subpods.forEach(subpods => {
                    if(subpods.plaintext) {
                        embeds[0].addField(pod.title+":", subpods.plaintext, false)
                    } else {
                        embeds.push(this.client.util
                            .embed()
                            .setColor(0x29d65d)
                            .setTitle(pod.title)
                            .setImage(subpods.img.src)
                            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL()))
                    }
                });
            });
            
            embeds.forEach(embed => {
                message.channel.send(embed)
            });
        }
    }
}

module.exports = WolframCommand;
