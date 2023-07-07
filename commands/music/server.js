const { SlashCommandBuilder } = require('discord.js');


const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides information about the server.');

async function execute(commandParams) {
	return await commandParams.interaction.reply(`This server is ${commandParams.interaction.guild.name} and has ${commandParams.interaction.guild.memberCount} members.`);
}

module.exports = {
	data, execute,
};