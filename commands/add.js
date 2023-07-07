const { SlashCommandBuilder } = require('discord.js');
const { streamAudio } = require('../scripts/streamSong');
const { joinVoiceChannel } = require('@discordjs/voice');
const { metadataExtract } = require('../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('add')
	.setDescription('track to add')
	.addStringOption(option => option
		.setName('query')
		.setDescription('enter ur track')
		.setRequired(true));

async function execute(commandParams) {
	const { client } = commandParams;
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const prompt = await metadataExtract('query', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	try {
		joinVoiceChannel(
			{
				channelId:voice,
				guildId:replyTarget.guildId,
				adapterCreator:replyTarget.guild.voiceAdapterCreator,
			},
		);
		return await streamAudio(client, replyTarget, prompt);
	}
	catch (error) {
		console.log(error);
	}
}
module.exports = {
	data, execute,
};