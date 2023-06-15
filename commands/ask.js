const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { answer } = require('../scripts/forAiChat');


const data = new SlashCommandBuilder()
	.setName('ask')
	.setDescription('ask anything UwU.')
	.addStringOption(option => option
		.setName('q')
		.setDescription('enter ur prompt here')
		.setRequired(true));

async function execute(funcParams) {
	const interaction = funcParams.interaction;
	const message = funcParams.message;
	if (interaction) {
		try {
			let result = await answer(funcParams);
			result = codeBlock(result);
			console.log(result);
			await interaction.reply('wait bro');
			return await interaction.channel.send({ embeds: [result] }) ;
		}
		catch (error) {
			console.error(error);
		}
	}
	else {
		try {
			const result = await answer(funcParams);
			console.log(result);
			return await message.channel.send({ embeds: [result] });
		}
		catch (error) {
			console.error(error);
		}
	}
}

module.exports = {
	data, execute,
};
