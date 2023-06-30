const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');
const { useResume } = require('../utils/songUtils');


const data = new SlashCommandBuilder()
	.setName('skip')
	.setDescription('skip track');


async function execute(commandParams) {
	const { interaction, message } = commandParams;
	// const { id, avatar, username } = user || author;
	const replyTarget = interaction || message;
	try {
		const queue = useQueue(replyTarget.guildId);
		queue.setMetadata(replyTarget);
		queue.node.skip();
		useResume(replyTarget.guild.id);
	}
	catch (error) {
		console.log(error);
	}
}




module.exports = {
	data, execute,
};
