const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const defaultEmbed = require('../../embeds/embedTemplate');
const { metadataExtract } = require('../../utils/deconstructor');
const commandPath = path.join(__dirname, '../../commands');
const commandFolders = fs.readdirSync(commandPath).filter(file => !file.endsWith('.js'));

const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('help menu');

/**
     * Executes the command and returns the help menu as an embedded message.
     *
     * @param {Object} commandParams - The command parameters.
     * @returns {Promise} A promise that resolves with the reply containing the help menu as an embedded message.
     * @throws {Error} If an error occurs during execution.
*/
async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const arr = [];
	const helpEmbed = new defaultEmbed(commandParams);
	await helpEmbed.setInfo();

	try {
		for (const folder of commandFolders) {
			const filesPath = path.join(commandPath, folder);
			const commandFiles = fs.readdirSync(filesPath).filter(file => file.endsWith('.js'));
			for (const files of commandFiles) {
				const commandLocation = path.join(filesPath, files);
				const command = require(commandLocation);
				const { name, description, options } = command.data;
				const optionNames = options.map(option => option.name);
				const obj = {
					name, description, optionNames: optionNames.length === 0 ? '' : optionNames,
				};
				arr.push(obj);
			}
		}
		const helpCommands = arr.map(option => {
			const optionNames = option.optionNames.map(o => o.type === 5 ? ` ${o.name}, off` : o.name).join(', ');
			return `${option.name} - ${option.description}${optionNames ? ` [${optionNames}]` : ''}\n`;
		}).join('');

		helpEmbed.setTitle('Help Menu').setDescription(helpCommands).setThumbnail();
		return replyTarget.reply({ embeds:[helpEmbed] });
	}
	catch (error) {
		console.error(error);
		await helpEmbed.setError();
		return replyTarget.channel.send({ embeds:[helpEmbed] });
	}
}

module.exports = {
	data, execute,
};
