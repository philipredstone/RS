const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(`${this.client.user.tag} is now ready!`);
        this.client.user.setActivity('+help | rs.defyu.se', { type: 'WATCHING' });
    }
};
