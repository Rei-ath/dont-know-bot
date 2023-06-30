const { SlashCommandBuilder } = require('discord.js');
// const { joinVoiceChannel } = require('@discordjs/voice');

const { streamAudio } = require('../scripts/addSong');
// const { establishVCConnection } = require('@utils/voice');
const { joinVoiceChannel } = require('@discordjs/voice');


const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('track to play')
	.addStringOption(option => option
		.setName('query')
		.setDescription('enter ur track')
		.setRequired(true),
	);

async function execute(commandParams) {
	const { interaction, message, withoutPrefix } = commandParams;
	// const { user, author } = interaction || message;
	// const { id, avatar, username } = user || author;
	const replyTarget = interaction || message;
	const prompt = interaction ? interaction.options.getString('query') : withoutPrefix.slice(1).join(' ');
	const voice = replyTarget.member.voice.channelId;
	// console.log(voice);
	try {
		joinVoiceChannel(
			{
				channelId:voice,
				guildId:replyTarget.guildId,
				adapterCreator:replyTarget.guild.voiceAdapterCreator,
			},
		);
		// console.log(connection);
		// console.log(client.player)
		await streamAudio(commandParams, prompt);
	}
	catch (error) {
		console.log(error);
	}
}


// console.log(data);
module.exports = {
	data, execute,
};