const { SlashCommandBuilder } = require('discord.js');
const { image } = require('./scripts/forAiChat');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('make any image UwU.')
		.addStringOption(option => option
			.setName('d')
			.setDescription('enter ur desciption here')
			.setRequired(true)),
	async execute(funcParams) {
		const interaction = funcParams.interaction;
		if (interaction) {
			try {
				const channel = interaction.channel;
				await interaction.reply('wait bro');
				const prompt = await interaction.options.getString('d');
				const result = await image(prompt);
				console.log(result);
				return await channel.send({ embeds: [result] });
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			try {
				const message = funcParams.message;
				const result = await image(funcParams);
				console.log(result);
				return await message.channel.send({ embeds: [result] });
			}
			catch (error) {
				console.error(error);
			}
		}
	},
};

