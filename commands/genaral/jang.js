const { SlashCommandBuilder } = require('discord.js');


const data = new SlashCommandBuilder()
	.setName('jang')
	.setDescription('tells the fact');

async function execute(commandParams) {
	try {
		if (commandParams.interaction) {
			return await commandParams.interaction.reply('shes the cutest');
		}
		else {
			return await commandParams.message.channel.send('shes the cutest');
		}
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};