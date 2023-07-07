const { SlashCommandBuilder } = require('discord.js');
const { changeAvatar } = require('../../scripts/changeAv');
const { metadataExtract } = require('../../utils/deconstructor');

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


async function execute(commandParams) {
	const interaction = commandParams.interaction;
	const { id } = await metadataExtract('userInfo', commandParams);
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	if (id === '532798408340144148' || id === '991218096541020220') {
		if (interaction) {
			try {
				const argsLink = await interaction.options.getString('link');
				const argsKeyword = await interaction.options.getString('keyword');
				const nsfwEnabled = await interaction.options.getBoolean('nsfw');
				if (argsLink) {
					if (argsLink.includes(' ')) return interaction.channel.reply('no whitespaces allowed');
					console.log(argsLink, 'arglll');
					return await changeAvatar(argsLink);
				}
				if (argsKeyword?.includes(' ')) return interaction.channel.reply('no whitespaces allowed');
				if (nsfwEnabled) {
					const updatedArgsKeyword = argsKeyword ? `${argsKeyword} n` : `n`;
					await interaction.reply('wait bro inside');
					return await changeAvatar(updatedArgsKeyword);
				}
				await interaction.reply('wait bro outside');
				return await changeAvatar(argsKeyword);
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			try {
				const withoutPrefix = commandParams.withoutPrefix;
				withoutPrefix.shift();
				const args = withoutPrefix.join(' ');
				return await changeAvatar(args);
			}
			catch (error) {
				console.error(error);
			}
		}
	}
	else {
		return await replyTarget.reply('only rei and jang allowed');
	}
}

module.exports = { data, execute };