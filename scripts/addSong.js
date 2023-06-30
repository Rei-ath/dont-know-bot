const { QueryType } = require('discord-player');

async function streamAudio(commandParams, youtubeURL) {
	try {
		// Connect to a voice channel
		// Start FFmpeg subprocess for audio streaming
		const { interaction, message, client } = commandParams;
		const { user, author } = interaction || message;
		// const { id, avatar, username } = user || author;
		const replyTarget = interaction || message;
		// const prompt = youtubeURL
		// const voice = replyTarget.member.voice.channelI
		const options = { nodeOptions: { leaveOnEnd: false, metadata: replyTarget } };
		const trackQuery = youtubeURL;
		const channel = replyTarget.member.voice.channelId;

		await replyTarget.reply('will play');
		const isDirectURL = trackQuery.indexOf('https://youtu') === 0;
		const searchEngine = isDirectURL ? QueryType.YOUTUBE_PLAYLIST: QueryType.AUTO;
		// console.log(searchEngine);

		const searchResult = await client.player.search(trackQuery, { requestedBy: user || author, searchEngine });
		console.log(searchResult._data.tracks[0].playlist.tracks.Track);
		if (!searchResult.hasTracks()) {
			return await replyTarget.reply(`We found no tracks for ${trackQuery}!`);
		}

		const { queue } = await client.player.play(channel, searchResult, options);
		// console.log(queue)

		// PlayerStart event is responsible for handling reply
		queue.setMetadata(replyTarget);

		// Move all received tracks to start of the queue
		// useMoveToStart({
		// 	from: queue.tracks.data.length - 1,
		// 	num: 1,
		// 	guildId: replyTarget.guild.id,
		// });
	}
	catch (error) {
		console.error('Error streaming audio:', error);
	}
}
// streamAudio()



module.exports = {
	streamAudio,
};