const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { metadataExtract } = require('../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('join')
	.setDescription('join the channel');

async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
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
		return await replyTarget.reply('Joined Channel');
	}
	catch (error) {
		console.log(error);
	}
}
module.exports = {
	data, execute,
};