const { SlashCommandBuilder } = require('discord.js');
const { refreshCommand } = require('../scripts/deploy-commands');


const data = new SlashCommandBuilder()
	.setName('refresh')
	.setDescription('refreshes the commands');
async function execute(commandParams) {
	try {
		if (commandParams.interaction) {
			await refreshCommand();
			return await commandParams.interaction.channel.send('refreshed ');
		}
		else {
			await refreshCommand();
			return await commandParams.message.channel.send('refrefreshed successfully');
		}
	}
	catch (error) {
		commandParams.message.channel.send('emotional damage in refresh.js executeInteractionCmd()');
		console.log(error);
	}
}

module.exports = {
	data, execute,
};