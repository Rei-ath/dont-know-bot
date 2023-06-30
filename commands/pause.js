const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { useResume } = require('../utils/songUtils');

const data = new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pause a track');

async function execute(commandParams) {
	const { interaction, message } = commandParams;
	const replyTarget = interaction || message;
	try {
		const queue = useQueue(replyTarget.guildId);
		queue.setMetadata(replyTarget);
		queue.node.skip();
		useResume(replyTarget.guild.id);
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};
