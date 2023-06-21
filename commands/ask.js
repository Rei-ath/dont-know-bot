const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { getAnswer } = require('../scripts/openAiQuerryHandler');


const data = new SlashCommandBuilder()
	.setName('ask')
	.setDescription('ask anything UwU.')
	.addStringOption(option => option
		.setName('q')
		.setDescription('enter ur prompt here')
		.setRequired(true));

async function execute(commandParams) {
	const { interaction, message, withoutPrefix } = commandParams;
	const { user, author } = interaction || message;
	const { id, avatar, username } = user || author;
	const prompt = interaction ? interaction.options.getString('q') : withoutPrefix.slice(1).join(' ');
	console.log(prompt);
	try {
		const targetReply = interaction || message;
		await targetReply.reply('wait bro');
		const result = await getAnswer(prompt);
		codeBlock(result);
		result.data.author = {
			icon_url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
			name: (id === '532798408340144148') ? '~ Rei' : username,
		};
		return await targetReply.channel.send({ embeds: [result] });
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};
