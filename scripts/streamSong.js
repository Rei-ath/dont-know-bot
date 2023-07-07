const { QueryType } = require('discord-player');
const { useMoveToStart, useResume } = require('../utils/songUtils');


async function streamAudio(client, replyTarget, youtubeURL, cp) {
	try {
		const options = { nodeOptions: { leaveOnEnd: false, metadata: replyTarget } };
		const trackQuery = youtubeURL;
		const channel = replyTarget.member.voice.channelId;
		const { user, author } = replyTarget;
		const isDirectURL = trackQuery.includes('https://youtu');
		let searchEngine;
		if (isDirectURL) {
			if (trackQuery.includes('playlist')) return searchEngine = QueryType.YOUTUBE_PLAYLIST;
			searchEngine = QueryType;
		}
		if (trackQuery.includes('spotify')) {searchEngine = QueryType.AUTO;}
		else {
			searchEngine = QueryType.YOUTUBE_SEARCH;
		}
		const searchResult = await client.player.search(trackQuery, { requestedBy: user || author, searchEngine });
		if (!searchResult.hasTracks()) {
			return await replyTarget.reply(`We found no tracks for ${trackQuery}!`);
		}
		const { queue } = await client.player.play(channel, searchResult, options);
		// console.log()
		queue.setMetadata(replyTarget);
		queue.setRepeatMode(3);
		const trackData = searchResult._data.tracks[0];
		if (cp) {
			useResume(replyTarget.guild.id);
			useMoveToStart({
				from: queue.tracks.data.length - 1,
				num: 1,
				guildId: replyTarget.guild.id,
			});
		}
		const trackAddedEmbed = {
			title: trackData.title,
			url: trackData.url,
			author: {
				name: 'ADDED TO QUEE',
			} };
		return await replyTarget.channel.send({embeds:[trackAddedEmbed]})
	}
	catch (error) {
		console.error('Error streaming audio:', error);
	}
}

module.exports = {
	streamAudio,
};