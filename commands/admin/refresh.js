const { SlashCommandBuilder } = require('discord.js');
const { refreshCommand } = require('../../scripts/deploy-commands');
const { metadataExtract } = require('../../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('refresh')
	.setDescription('refreshes the commands');
/**
 * Executes the command to refresh a command.
 *
 * @param {Object} commandParams - The parameters for the command.
 * @param {Object} commandParams.interaction - The interaction object.
 * @param {Object} commandParams.message - The message object.
 * @returns {Promise} A promise that resolves with a message indicating the success or failure of the refresh.
 */
async function execute(commandParams) {
	try {
		const { id } = await metadataExtract('userInfo', commandParams);
		const replyTarget = await metadataExtract('replyTarget', commandParams);
		const authorizedUserIds = process.env['admins'] || require('../../config.json').admins;
		const isAuthorizedUser = authorizedUserIds.includes(id);
		if (isAuthorizedUser) {
			await refreshCommand();
			if (commandParams.interaction) {
				return await commandParams.interaction.channel.send('Command refreshed successfully.');
			}
			else {
				return await commandParams.message.channel.send('Command refreshed successfully.');
			}
		}
		else {
			return await replyTarget.reply('Only rei and jang are allowed to execute this command.');
		}
	}
	catch (error) {
		console.log(error);
		return await commandParams.message.channel.send('An error occurred while refreshing the command.');
	}
}

module.exports = {
	data, execute,
};