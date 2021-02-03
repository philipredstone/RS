const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: "Returns a list of all commands"
        });
    }

    async exec(message) {
        message.delete();
        const embed = this.client.util
            .embed()
            .setColor(0xDDD57A)
            .setTitle('Command List')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const modules = Array.from(this.client.commandHandler.modules, ([name, value]) => ({ name, value }));
        const commandz = message.content.slice(this.client.commandHandler.prefix(message).length + 4).trim().replace("+","");
        const error = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle(message.guild.prefix+commandz+":")
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())

        let found = false;
        let commandlist = "Prefix: `"+message.guild.prefix+"`\n"; 
        modules.forEach(element => {
            let commands = [];
            if(element.value.ownerOnly)
                return;
            element.value.aliases.forEach(command => {
                if(commandz != "") {
                    if(command == commandz) {
                        commands.push(command)
                        embed.setTitle(`${message.guild.prefix}${command}:`);
                        embed.setDescription((element.value.description).replace("###",this.client.commandHandler.prefix(message)),false)
                        found = true;
                    }
                } else {
                    commands.push(command)
                }
            });
            if(commandz == "") {
                let commands_string;
                if(commands.length > 1)
                    commands_string = commands.join('|')
                else
                    commands_string = commands[0]
                commandlist += `\n \`${commands_string}\``;
            }
        });
        if(commandlist != "") {
            found = true;
            embed.setDescription(commandlist + "\n\n `help <command>` to get more help!")
        }
        
        if(found)
            return message.channel.send(embed);
        else
            return message.channel.send(error.setDescription("Error: Command not found!"));
    }
}

module.exports = HelpCommand;