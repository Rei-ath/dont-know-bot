const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { metadataExtract } = require('../utils/deconstructor');

const data = new SlashCommandBuilder()
	.setName('distroy')
	.setDescription('Bot will exit from voice channel');
async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const connection = getVoiceConnection(replyTarget.guildId);
	if (!connection) {
		return await replyTarget.reply('You aren`n in voice channel');
	}

	commandParams.client.player.voiceUtils.disconnect(connection);
	await replyTarget.reply('Bot disconnected from voice channel');
}
module.exports = {	data, execute };