const { REST, Routes } = require('discord.js');
const clientId = require('../config.json').clientId || process.env['clientId'];
const token = require('../config.json').token || process.env['token'];
const fs = require('node:fs');
const path = require('node:path');
const commands = [];
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

async function refreshCommand() {
	try {
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			console.log(command);
			console.log(file);
			commands.push(command.data.toJSON());
		}
		const rest = new REST({ version: '10' }).setToken(token);
		console.log(commands);
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	refreshCommand,
};