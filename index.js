require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const token = require('./config.json').token || process.env['token'];
const { Player } = require('discord-player');
const DeezerExtractor = require('discord-player-deezer').default;
const { VoiceConnectionStatus } = require('@discordjs/voice');
// const { trackEmbeds } = require('./embeds/trackEmbed.js');
// console.log(trackEmbeds);
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});
client.commands = new Collection();

// client.player = new Player(client);

async function InitPlayer() {
	client.player = new Player(client);
	client.player.extractors.register(DeezerExtractor);

	await client.player.extractors.loadDefault();

	client.player.events.on('playerStart', async ({ metadata }, track) => {
		try {
			// const embed = new trackEmbeds(track).setFieldsBySource(track.source);
			// const isWaitingForReply = !metadata.replied && metadata.deferred;
			// if (isWaitingForReply) {
			// console.log(metadata)
			// await metadata.editReply({ embeds: [embed] });
			await metadata.channel.send(`${track}`);
		}
		catch (err) {
			console.log('Error sending embed:', err);
		}
	});

	client.player.events.on('connection', (queue) => {
		queue.dispatcher.voiceConnection.on('stateChange', (oldState, newState) => {
			if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
				queue.dispatcher.voiceConnection.configureNetworking();
			}
		});
	});
}

InitPlayer();

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
	console.log(interaction);
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
	if (message.author.id === `853629533855809596`) {
		console.log(message, `messaffe`);
		// console.log(message.embeds, `embeds`);
		// console.log(message.components, `components`);
	}
	try {
		const messageCommand = message.content;
		if (messageCommand.charAt(0) !== '0') return;
		let withoutPrefix = messageCommand.slice(1).trim();
		withoutPrefix = withoutPrefix.split(/\s+/g);
		const command = client.commands.get(withoutPrefix[0]?.toLowerCase());
		if (!command) return;
		console.log(withoutPrefix);
		const commandParams = {
			'client':client,
			'message':message,
			'withoutPrefix': withoutPrefix,
			'isOn':true,
		};
		commandParams.isOn = withoutPrefix[1]?.toLowerCase() == 'off' ? false : true;
		return await command.execute(commandParams);
	}
	catch (error) {
		console.error(error);
	}
});


client.login(token);