const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});
client.commands = new Collection();

const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
try {
	for (const file of commandFiles) {
		const filePath = path.join(commandPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}
catch (error) {
	console.log(error);
}


client.once('ready', async c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		const commandParams = {
			'interaction':interaction,
			'client':client,
		};
		return await command.execute(commandParams);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.on('messageCreate', async message => {
	try {
		const messageCommand = message.content;
		if (!messageCommand.startsWith('0') && messageCommand.length === 1) return;
		let withoutPrefix = messageCommand.slice(1).trim();
		console.log(withoutPrefix);
		withoutPrefix = withoutPrefix.split(/\s+/g);
		const command = client.commands.get(withoutPrefix[0].toLowerCase());
		console.log(withoutPrefix);
		console.log(command);
		if (!command) return;
		const commandParams = {
			'client':client,
			'message':message,
			'withoutPrefix':withoutPrefix,
			'isOn':true,
		};
		if (withoutPrefix[1].toLowerCase() == 'off') {
			commandParams.isOn = false;
			return await command.execute(commandParams);
		}
		return await command.execute(commandParams);
	}
	catch (error) {
		console.error(error);
	}
});


client.login(token);