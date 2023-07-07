const { SlashCommandBuilder } = require('discord.js');
const { metadataExtract } = require('../../utils/deconstructor');
const { useQueue } = require('discord-player');


const data = new SlashCommandBuilder()
	.setName('shuffle')
	.setDescription('shuffles the playlist');

async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const queue = useQueue(replyTarget.guildId);
	queue.tracks.shuffle();
	return await replyTarget.channel.send('SHUFFLED TRACKS');
}

module.exports = {
	data, execute,
};