const { Events } = require('discord.js');

const name = Events.InteractionCreate;
/**
     * Executes the command or button based on the provided interaction.
     * @param {object} interaction - The interaction object that contains information about the interaction event.
     * @returns {Promise<any>} - The result of executing the command or button function, or an error message if an error occurs.
     */
async function execute(interaction) {

	const command = interaction.client.commands.get(interaction.commandName);
	const custom_id = interaction.client.buttons.get(interaction.customId);
	if (!command) {
		console.log(`it was not chat interaction`);
	}
	else if (!custom_id) {
		console.log('naa dude no button found');
	}
	try {
		const commandParams = {
			'interaction': interaction,
			'client': interaction.client,
			'button': false,
		};
		if (command) {
			return await command.execute(commandParams);
		}
		else if (custom_id) {
			commandParams.button = true;
			return custom_id(commandParams);
		}
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}

module.exports = { name, execute };