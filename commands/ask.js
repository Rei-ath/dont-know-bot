const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { getAnswer } = require('../scripts/openAiQuerryHandler');
const { metadataExtract } = require('../utils/deconstructor');

const data = new SlashCommandBuilder()
	.setName('ask')
	.setDescription('ask anything UwU.')
	.addStringOption(option => option
		.setName('q')
		.setDescription('enter ur prompt here')
		.setRequired(true));


async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const prompt = await metadataExtract('q', commandParams);
	console.log(prompt);
	try {
		await replyTarget.reply('wait bro');
		const result = await getAnswer(prompt, commandParams);
		codeBlock(result);
		return await replyTarget.channel.send({ embeds: [result] });
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};
