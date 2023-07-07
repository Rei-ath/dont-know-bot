const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');
const { useResume } = require('../../utils/songUtils');
const { metadataExtract } = require('../../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('skip')
	.setDescription('skip track');


async function execute(commandParams) {
	const replyTarget = metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	try {
		const queue = useQueue(replyTarget.guildId);
		queue.setMetadata(replyTarget);
		queue.node.skip();
		useResume(replyTarget.guild.id);
		return await replyTarget.channel.send('SKIPPED TRACK');
	}
	catch (error) {
		console.log(error);
	}
}


module.exports = {
	data, execute,
};
