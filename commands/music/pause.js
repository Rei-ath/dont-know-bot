const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
// const { useResume } = require('../../utils/songUtils');
const { metadataExtract } = require('../../utils/deconstructor');

const data = new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pause a track');

async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	try {
		const queue = useQueue(replyTarget.guildId);
		queue.setMetadata(replyTarget);
		// queue.node.isPaused();
		queue.node.setPaused(true);
		return await replyTarget.reply('PAUSED TRACKS');

	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};
