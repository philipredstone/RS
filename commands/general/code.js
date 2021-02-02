const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { highlightScreenshotToPath } = require('highlight.js-screenshot');
const fs = require("fs");

class CodeCommand extends Command {
    constructor() {
        super('code', {
            aliases: ['code'],
            description: "Generate an Image showing your code. \n   Usage: `###code <code>`"
        });
    }
    async exec(message) {
        message.delete();
        const embed = this.client.util
            .embed()
            .setColor(0xDDD57A)
            .setTitle('Generating image...')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const mess = await message.channel.send(embed)
        const id = Math.floor(+new Date() / 1000);
        const code = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim();
        await highlightScreenshotToPath(code, "./images/"+id+".png",false,"ocean")
        mess.delete();
        await message.channel.send("Your image is ready:",{files: ["./images/"+id+".png"]});
        return fs.unlinkSync("./images/"+id+".png");
    }
}

module.exports = CodeCommand;
