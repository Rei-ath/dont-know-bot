const { GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const options = {
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
};


async function loadCommands(client) {
	client.commands = new Collection();
	client.buttons = new Collection();
	const commandPath = path.join(__dirname, '../commands');
	const commandFolders = fs.readdirSync(commandPath).filter(file => !file.endsWith('.js'));
	try {
		for (const folder of commandFolders) {
			const filesPath = path.join(commandPath, folder);
			const commandFiles = fs.readdirSync(filesPath).filter(file => file.endsWith('.js'));
			for (const files of commandFiles) {
				const commandLocation = path.join(filesPath, files);
				const command = require(commandLocation);
				client.commands.set(command.data.name, command);
				const buttons = command.row?.components;
				if (buttons) {
					for (const button of buttons) {
						client.buttons.set(button.data.custom_id, command.execute);
					}
				}
			}
		}
	}
	catch (error) {
		console.log(error);
	}
}


async function loadButtons(client) {
	const eventsPath = path.join(__dirname, '../events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

async function loadAll(client) {
	await loadCommands(client);
	await loadButtons(client);
}

module.exports = { loadAll, options };

