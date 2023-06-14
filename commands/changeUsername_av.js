const { changeAvUsername } = require('./scripts/change');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('change')
		.setDescription('picture')
		.addStringOption(option => option
			.setName('q')
			.setDescription('enter ur link')),
	async execute(funcParams) {
		const interaction = funcParams.interaction;
		if (interaction) {
			try {
				const link = await interaction.options.getString('q');
				await interaction.reply('wait bro');
				return await changeAvUsername(link);
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			try {
				const withoutPrefix = funcParams.withoutPrefix;
				withoutPrefix.shift();
				const link = withoutPrefix.join(' ');
				return await changeAvUsername(link);
			}
			catch (error) {
				console.error(error);
			}
		}
	},
};