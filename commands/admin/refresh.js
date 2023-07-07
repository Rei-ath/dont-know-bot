const { SlashCommandBuilder } = require('discord.js');
const { refreshCommand } = require('../../scripts/deploy-commands');
const { metadataExtract } = require('../../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('refresh')
	.setDescription('refreshes the commands');
async function execute(commandParams) {
	const { id } = await metadataExtract('userInfo', commandParams);
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	if (id === '532798408340144148' || id === '991218096541020220') {
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
	else {
		return await replyTarget.reply('only rei and jang allowed')
	}
}

module.exports = {
	data, execute,
};