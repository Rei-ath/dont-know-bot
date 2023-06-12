const { SlashCommandBuilder } = require('discord.js');
const {deployCmd} = require('./scripts//deploy-commands')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('refreshes the commands'),
	async execute(funcParams) {
		try {
			if (funcParams.interaction) {
        await deployCmd();
				return await funcParams.interaction.channel.send('refreshed ');
			}
			else {
        await deployCmd();
				return await funcParams.message.channel.send('refrefreshed successfully');
			}
		}
		catch (error) {
      funcParams.message.send('emotional damage in refresh.js executeInteractionCmd()')
			console.log('emotional damage in refresh.js executeInteractionCmd()');
		}
	},
};