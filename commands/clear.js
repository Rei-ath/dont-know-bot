const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');
const { metadataExtract } = require('../utils/deconstructor');


const	data = new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Queue will be cleared');


async function execute(commandParams) {
	const replyTarget = metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const queue = useQueue(replyTarget.guildId);
	if (!queue) {
		return await replyTarget.reply('Bot isn`t in the voice channel');
	}
	queue.tracks.clear();
	// commandParams.client.player.distroy();
	await replyTarget.reply('Queue was cleared');
}

module.exports = {
	data, execute,
};