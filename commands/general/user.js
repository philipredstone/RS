const { Command } = require('discord-akairo');
const client = require('../../index')

class UserCommand extends Command {
    constructor() {
        super('user', {
            aliases: ['user'],
            args: [
                {
                    id: 'user'
                }
            ],
            channel: 'guild',
            description: "Get simple user information about you or an given user id \n   Usage: `###user (<user_id>)`"
        });
    }
 // ;
    async exec(message, args) {
        message.delete()

        const userEmbed = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('User: ')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        const errorEmbed = this.client.util
            .embed()
            .setColor(0xd92929)
            .setTitle('User: Error')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())

        let user_id = (args.user) ? args.user : message.member.user.id;

        let date = new Date((user_id / 4194304) + 1420070400000);
        client.name.users.fetch(user_id).then(user => {
            let name = user.username+'#'+user.discriminator
            userEmbed
                .setTitle('User: '+name)
                .addField('Created at:',date)
            return message.channel.send(userEmbed)
        }).catch(error => message.channel.send(errorEmbed.setDescription('No user found with snowflake: `'+user_id+'`')));
    }
}

module.exports = UserCommand;
