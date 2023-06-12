const { changeAvUsername } = require('./scripts/change');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('change')
		.setDescription('picture')
		.addStringOption(option => option
			.setName('q')
			.setDescription('enter ur link')
			.setRequired(true)),
	async execute(funcParams) {
		const interaction = funcParams.interaction;
		const message = funcParams.message;
		if (interaction) {
			try {
				const link = await interaction.options.getString('q');
				// console.log(result);
				await interaction.reply('wait bro');
				await changeAvUsername(link);
				return await interaction.channel.send('done channge') ;
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
				const result = await changeAvUsername(link);
				console.log(result);
				return await message.channel.send('done change');
			}
			catch (error) {
				console.error(error);
			}
		}
	},
};