/* eslint-disable no-unused-vars */
const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


try {
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		console.log(command);
		console.log(file);
		commands.push(command.data.toJSON());
	}
}
catch (error) {
	console.error(error);
}

const rest = new REST({ version: '10' }).setToken(token);

console.log(commands);

// eslint-disable-next-line no-unused-vars
async function deployCmd() {
	try {
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
async function deleteCmd() {
	try {
		// eslint-disable-next-line no-unused-vars
		// await rest.put(Routes.applicationGuildCommands(clientId, guildId),
		// 	{ body: [] },
		// );
		// console.log('Successfully deleted guild command');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: [] },
		);
		console.log('Successfully deleted application command');
	}
	catch (error) {
		console.error(error);
	}
}
// deployCmd();

deleteCmd();
deployCmd();