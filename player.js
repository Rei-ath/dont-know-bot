const { Player } = require('discord-player');
const DeezerExtractor = require('discord-player-deezer').default;
const { VoiceConnectionStatus, joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const playEmbed = require('./embeds/playEmbed');
const { useResume } = require('./utils/songUtils');

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
			let VCConnection = getVoiceConnection(queue.channel.guildId);
			if (!VCConnection) {
				joinVoiceChannel({
					channelId: queue.channel.id,
					guildId: queue.channel.guildId,
					adapterCreator: queue.channel.guild.voiceAdapterCreator,
				});

				VCConnection = getVoiceConnection(queue.channel.guild.id);
				useResume(queue.channel.guildId);
			}
			if (!VCConnection) {
				return { status: false, reason: 'Can\'t connect to a voice channel' };
			}
			if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
				queue.dispatcher.voiceConnection.configureNetworking();
			}
			return {status:true};
		});
	});
}

module.exports = {
	InitPlayer,
};