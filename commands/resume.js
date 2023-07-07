const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { useResume } = require('../utils/songUtils');
const { metadataExtract } = require('../utils/deconstructor');

const data = new SlashCommandBuilder()
	.setName('resume')
	.setDescription('resumes a track');

async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	try {
		const queue = useQueue(replyTarget.guildId);
		queue.setMetadata(replyTarget);
		// queue.node.skip();
		useResume(replyTarget.guild.id);
		return await replyTarget.reply('REUSMED TRACKS');
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};