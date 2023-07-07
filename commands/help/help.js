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
				const name = command.data.name;
				const discription = command.data?.description;
				const optionnames = command.data.options.map(option => option);
				const obj = {
					name, discription, optionnames:optionnames.length === 0 ? '' : optionnames,
				};
				arr.push(obj);
			}
		}
		const helpCommands = arr.map(option => {
			if (option.optionnames.length === 0) return `${option.name} - ${option.discription}\n`;
			return `${option.name} - ${option.discription} [${option.optionnames.map(o => {return o.type === 5 ? ` ${o.name}, off` : o.name;})}]\n`;
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
