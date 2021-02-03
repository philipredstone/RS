/****************************/
/*    DATABASE CONNECTION   */
/****************************/
const mysql = require('mysql');
require('dotenv').config();


let connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DB
});
connection.connect();

function LevelSystem(guild,id,msg) {
    if(id == 746037195428724837) return;
    getLevel(guild,id,msg)
}

function getLevel(guild,id,msg) {
    connection.query(`SELECT * FROM user WHERE userid = ${id} AND guildid = ${guild}`, function (error, results, fields) {
        if (error) throw error;
        if(!results[0]) {
            connection.query(`INSERT INTO user (guildid,userid,level,xp) VALUES (${guild},${id},0,0)`, function (error, results, fields) {
                if (error) throw error;
                addLevel(guild,id,{level: 0, xp: 0},msg)
            });
        } else {
            addLevel(guild,id,results[0],msg)
        }
    });
}


function addLevel(guild,id,data,msg) {
    if(data == undefined) {
        connection.query(`INSERT INTO user (guildid,userid,level,xp) VALUES (${guild},${id},0,0)`, function (error, results, fields) {
            if (error) throw error;
            addLevel(guild,id,results[0],msg)
            return;
        });
    }
    let needed_xp = (data.level < 10) ? 100*(1+0.3)**data.level : 1500;
    let newxp = data.xp+1;
    let newlvl = data.level + 1;
    if(newxp >= needed_xp) {
        connection.query(`UPDATE user SET xp = 0, level = ${newlvl} WHERE userid = ${id} AND guildid = ${guild}`, function (error, results, fields) {
            if (error) throw error;
            if(msg.guild.get('levelmode') != "silent")
                msg.channel.send("Level Up!")
        });
    } else {
        connection.query(`UPDATE user SET xp = ${newxp} WHERE userid = ${id} AND guildid = ${guild}`, function (error, results, fields) {
            if (error) throw error;
        });
    }
}

module.exports = LevelSystem;