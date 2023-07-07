const { Player } = require('discord-player');
const DeezerExtractor = require('discord-player-deezer').default;
const { VoiceConnectionStatus } = require('@discordjs/voice');
const playEmbed = require('./embeds/playEmbed');

async function InitPlayer(client) {

	client.player = new Player(client);
	client.player.extractors.register(DeezerExtractor);
	await client.player.extractors.loadDefault();
	client.player.events.on('playerStart', async ({ metadata }, track) => {
		try {
			const playing = new playEmbed(track).prepareSongStartedEmbed();
			await metadata.channel.send({ embeds: [playing] });
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

module.exports = {
	InitPlayer,
};