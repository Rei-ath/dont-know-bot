const { Events } = require('discord.js');


const name = Events.ClientReady;
const once = true;
function execute(client) {
	if (!client) return;
	console.log(`Ready! Logged in as ${client.user.tag}`);
}
module.exports = { name, once, execute };