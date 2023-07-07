const { SlashCommandBuilder } = require('discord.js');
const { getImage } = require('../scripts/openAiQuerryHandler');
const { metadataExtract } = require('../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('image')
	.setDescription('make any image UwU.')
	.addStringOption(option => option
		.setName('d')
		.setDescription('enter ur desciption here')
		.setRequired(true));

async function execute(commandParams) {
	const { interaction, withoutPrefix } = commandParams;
	const replyTarget = metadataExtract('replyTarget', commandParams);
	const prompt = interaction ? interaction.options.getString('q') : withoutPrefix.slice(1).join(' ');
	console.log(prompt);
	try {
		await replyTarget.reply('wait bro');
		const result = await getImage(prompt, commandParams);
		return await replyTarget.channel.send({ embeds: [result] });
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};

