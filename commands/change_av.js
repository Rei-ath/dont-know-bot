const { SlashCommandBuilder } = require('discord.js');
const { changeAvUsername } = require('../scripts/change');

const data = new SlashCommandBuilder()
	.setName('change')
	.setDescription('change bot avatar')
	.addSubcommand(subcommand =>
		subcommand
			.setName('random')
			.setDescription('random waifu pic')
			.addBooleanOption(option =>
				option.setName('nsfw')
					.setDescription('by default false')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('bylink')
			.setDescription('provide a link')
			.addStringOption(option => option
				.setName('link')
				.setDescription('enter ur link')
				.setRequired(true)),
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName('bymanual')
			.setDescription('choose manual')
			.addStringOption(option => option
				.setName('keyword')
				.setDescription('enter ur link')
				.setRequired(true))
			.addBooleanOption(option =>
				option.setName('nsfw')
					.setDescription('by default false')),
	);


async function execute(funcParams) {
	const interaction = funcParams.interaction;
	if (interaction) {
		try {
			const argsLink = await interaction.options.getString('link');
			const argsKeyword = await interaction.options.getString('keyword');
			const bool = await interaction.options.getBoolean('nsfw');
			if (argsLink) {
				if (argsLink.includes(' ')) return interaction.channel.reply('no whitespaces allowed');
				console.log(argsLink, 'arglll');
				return await changeAvUsername(argsLink);
			}
			if (argsKeyword?.includes(' ')) return interaction.channel.reply('no whitespaces allowed');
			if (bool) {
				const updatedArgsKeyword = argsKeyword ? `${argsKeyword} n` : `n`;
				await interaction.reply('wait bro inside');
				return await changeAvUsername(updatedArgsKeyword);
			}
			await interaction.reply('wait bro outside');
			return await changeAvUsername(argsKeyword);

		}
		catch (error) {
			console.error(error);
		}
	}
	else {
		try {
			const withoutPrefix = funcParams.withoutPrefix;
			withoutPrefix.shift();
			const args = withoutPrefix.join(' ');
			return await changeAvUsername(args);
		}
		catch (error) {
			console.error(error);
		}
	}
}
module.exports = { data, execute };