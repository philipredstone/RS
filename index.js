/****************************/
/*   IMPORTS & VARIABLES    */
/****************************/
require('dotenv').config();
const GuardianClient = require('./core/client.js');
const client = new GuardianClient();
const express = require('express');
const app = express();
const request = require('request');
const btoa = require('btoa');
const LevelSystem = require('./core/LevelSystem')

const port = 3000;




/****************************/
/*       DISCORD BOT        */
/****************************/
client.login(process.env.TOKEN);

client.on('message', async (message) => {
    //connection.query(`INSERT INTO messages (timestamp,userid) VALUES (UNIX_TIMESTAMP(),${message.author.id})`, function (error, results, fields) {
    //    if (error) throw error;
    //});
    LevelSystem(message.channel.guild.id,message.author.id,message,false)
    //connection.query(`SELECT COUNT(*) AS count FROM messages WHERE userid = ${message.author.id}`, function (error, results, fields) {
    //    if (error) throw error;
    //    console.log(results[0].count)
    //});
});







/****************************/
/*      WEB DASHBOARD       */
/****************************/
app.use('/dashboard', express.static(__dirname + '/dashboard'))

app.get('/dashboard', (req, res) => {
    res.sendFile("./dashboard/main.html", {root: __dirname });
});


app.get('/dashboard/guild/', (req, res) => {
    res.sendFile("./dashboard/guild.html", {root: __dirname });
});

app.get('/login', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${req.protocol}%3A%2F%2F${req.get('host')}%2Fauthorize&response_type=code&scope=guilds%20identify`);
});

app.get('/authorize', (req, res) => {
    const code = req.query.code;
    const cred = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    var options = {
        'method': 'POST',
        'url': `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&redirect_uri=${req.protocol}%3A%2F%2F${req.get('host')}%2Fauthorize`,
        'headers': {
          'Authorization': `Basic ${cred}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'grant_type': 'authorization_code',
          'code': code,
          'client_id': process.env.CLIENT_ID,
          'client_secret': process.env.CLIENT_SECRET
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send("<script>localStorage.setItem('token','"+JSON.parse(response.body).access_token+"');window.close();</script>")
    });
});

app.get('/guilds', (req, res) => {
    var options = {
        'method': 'GET',
        'url': `https://discordapp.com/api/v6/users/@me/guilds`,
        'headers': {
          'Authorization': `Bearer ${req.query.token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let data = [];
        JSON.parse(response.body).forEach(element => {
            if(client.guilds.cache.has(element.id) || element.owner == true) {
                data.push('{"name": "'+element.name+'", "id": "'+element.id+'", "icon": "'+element.icon+'", "hasBot": "'+client.guilds.cache.has(element.id)+'", "owner": "'+element.owner+'"}');//element.owner
            }
        })
        res.send("["+data.join(", ")+"]");
    });
});

app.get('/guild/:guildID', (req, res) => {
    let options = {
        'method': 'GET',
        'url': `https://discordapp.com/api/v6/guilds/${req.params.guildID}`,
        'headers': {
          'Authorization': `Bot ${process.env.TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
    });
});


app.get('/guild/stats/:guildID', (req, res) => {
    res.send(`{"prefix": "${client.guilds.cache.get(req.params.guildID).prefix}","member_count": "${client.guilds.cache.get(req.params.guildID).memberCount}","region": "${client.guilds.cache.get(req.params.guildID).region}"}`)
});


app.get('/user/:userID', (req, res) => {
    let options = {
        'method': 'GET',
        'url': `https://discordapp.com/api/v6/users/${req.params.userID}`,
        'headers': {
          'Authorization': `Bot ${process.env.TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
    });
});


app.listen(port, () => {
  console.log(`Dashboard listening at http://localhost:${port}`)
})