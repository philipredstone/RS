const { Command } = require('discord-akairo');
const mysql = require('mysql');
require('dotenv').config();

class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level'],
            description: "Displays your level."
        });
    }

    async exec(message, args) {
        let connection = mysql.createConnection({
            host     : process.env.MYSQL_HOST,
            user     : process.env.MYSQL_USER,
            password : process.env.MYSQL_PASSWORD,
            database : process.env.MYSQL_DB
        });
        connection.connect();
        const success = this.client.util
            .embed()
            .setColor(0x29d65d)
            .setTitle('Level-System')
            .setFooter("Requested by " + message.member.user.tag, message.member.user.avatarURL())
        connection.query(`SELECT * FROM user WHERE userid = ${message.author.id} AND guildid = ${message.channel.guild.id}`, function (error, results, fields) {
            let needed_xp = (results[0].level < 10) ? 100*(1+0.3)**results[0].level : 1500;
            let newxp = results[0].xp;
            message.channel.send(success.setDescription('Your current level is: `'+results[0].level+'`\nProgress to the next level: `'+newxp+"/"+needed_xp+'` XP'))
            message.delete()
        });
    }
}

module.exports = LevelCommand;
