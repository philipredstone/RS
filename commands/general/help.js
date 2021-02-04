const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'command'
                }
            ],
            description: "Returns a list of all commands \n   Usage: `###help (<command>)`"
        });
    }

    async exec(message, args) {
        message.delete();
        const commandEmbed = this.client.util
            .embed()
            .setColor(0xDDD57A)
            .setTitle('Command List')
            .setFooter(`Requestet by ${message.member.user.tag}`, message.member.user.avatarURL())
        const modules = Array.from(this.client.commandHandler.modules, ([name, value]) => ({ name, value }));
        let commandlist = "";
        modules.forEach(command => {
            if(command.value.ownerOnly)
                return;
            let aliases = command.value.aliases;
            if(args.command) {
                aliases.forEach(alias => {
                    if(alias == args.command) {
                        commandEmbed.setTitle(this.client.commandHandler.prefix(message)+args.command+":");
                        commandEmbed.setDescription(command.value.description.replace("###",this.client.commandHandler.prefix(message)))
                    }
                });
            } else {
                let aliaslist = [];
                aliases.forEach(alias => {
                    aliaslist.push(alias);
                });
                commandlist += "\n`"+aliaslist.join("|")+"`";
            }
        });
        if(commandlist != "")
            commandEmbed.setDescription(`Prefix: \`${message.guild.prefix}\`\n${commandlist}\n\n \`help <command>\` to get command specific help!\``)
        message.channel.send(commandEmbed)
    }
}

module.exports = HelpCommand;