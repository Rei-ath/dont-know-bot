const { SlashCommandBuilder } = require('discord.js');
const { getImage } = require('../scripts/openAiQuerryHandler');


const data = new SlashCommandBuilder()
	.setName('image')
	.setDescription('make any image UwU.')
	.addStringOption(option => option
		.setName('d')
		.setDescription('enter ur desciption here')
		.setRequired(true));

async function execute(funcParams) {
	const { interaction, message, withoutPrefix } = funcParams;
	const { user, author } = interaction || message;
	const { id, avatar, username } = user || author;
	const prompt = interaction ? interaction.options.getString('q') : withoutPrefix.slice(1).join(' ');
	console.log(prompt);
	try {
		const targetReply = interaction || message;
		await targetReply.reply('wait bro');
		const result = await getImage(prompt);
		result.data.author = {
			icon_url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
			name: (id === '532798408340144148') ? '~ Rei' : username,
		};
		return await targetReply.channel.send({ embeds: [result] });
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};

