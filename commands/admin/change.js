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


/**
 * Executes the appropriate subcommand to change the avatar of a Discord bot.
 * @param {Object} commandParams - An object containing information about the command.
 * @param {Object} commandParams.interaction - The interaction object (if any).
 * @param {string[]} commandParams.withoutPrefix - The command arguments without the prefix.
 * @param {Object} commandParams.replyTarget - The reply target object.
 * @returns {Promise} - A promise that resolves with the result of the executed subcommand or a message indicating that only authorized users are allowed.
 */
async function execute(commandParams) {
	const interaction = commandParams.interaction;
	const { id } = await metadataExtract('userInfo', commandParams);
	const replyTarget = await metadataExtract('replyTarget', commandParams);

	const authorizedUserIds = process.env['admins'] || require('../../config.json').admins;
	const isAuthorizedUser = authorizedUserIds.includes(id);

	if (!isAuthorizedUser) {
		return await replyTarget.reply('Only Rei and Jang are allowed to execute this command.');
	}

	try {
		if (interaction) {
			const argsLink = await interaction.options.getString('link');
			const argsKeyword = await interaction.options.getString('keyword');
			const nsfwEnabled = await interaction.options.getBoolean('nsfw');

			if (argsLink) {
				if (argsLink.includes(' ')) {
					return interaction.channel.reply('No whitespaces allowed in the link.');
				}
				return await changeAvatar(argsLink);
			}

			if (argsKeyword?.includes(' ')) {
				return interaction.channel.reply('No whitespaces allowed in the keyword.');
			}

			const updatedArgsKeyword = nsfwEnabled ? `${argsKeyword || ''} n` : argsKeyword;
			const replyMessage = nsfwEnabled ? 'Wait bro inside' : 'Wait bro outside';

			await interaction.reply(replyMessage);
			return await changeAvatar(updatedArgsKeyword);
		}
		else {
			const withoutPrefix = commandParams.withoutPrefix.slice(1);
			const args = withoutPrefix.join(' ');
			return await changeAvatar(args);
		}
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = { data, execute };