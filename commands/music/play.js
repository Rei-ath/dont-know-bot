const { SlashCommandBuilder } = require('discord.js');
const { streamAudio } = require('../../scripts/streamSong');
const { joinVoiceChannel } = require('@discordjs/voice');
const { metadataExtract } = require('../../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('plays the song')
	.addStringOption(option => option
		.setName('query')
		.setDescription('enter ur track')
		.setRequired(true));

async function execute(commandParams) {
	const { interaction, withoutPrefix, client } = commandParams;
	const replyTarget = metadataExtract('replyTarget', commandParams);
	const prompt = interaction ? interaction.options.getString('query') : withoutPrefix.slice(1).join(' ');
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const cp = true;
	try {
		joinVoiceChannel(
			{
				channelId:voice,
				guildId:replyTarget.guildId,
				adapterCreator:replyTarget.guild.voiceAdapterCreator,
			},
		);
		await streamAudio(client, replyTarget, prompt, cp);
	}
	catch (error) {
		console.log(error);
	}
}
module.exports = {
	data, execute,
};