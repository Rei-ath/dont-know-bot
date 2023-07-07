const { Events } = require('discord.js');

const name = Events.InteractionCreate;
async function execute(interaction) {
	const command = interaction.client.commands.get(interaction.commandName);
	const custom_id = interaction.client.buttons.get(interaction.customId);
	if (!command) {
		console.log(`it was not chatinteraction`);
	}
	else if (!custom_id) {
		console.log('naa dude no button found');
	}
	try {
		const commandParams = {
			'interaction':interaction,
			'client':interaction.client,
			'button':false,
		};
		if (command) {return await command.execute(commandParams);}
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