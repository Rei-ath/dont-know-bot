const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
// const { useResume } = require('../../utils/songUtils');
const { metadataExtract } = require('../../utils/deconstructor');

const data = new SlashCommandBuilder()
	.setName('loop')
	.setDescription('24/7 mode')
	.addSubcommand(subcommand =>
		subcommand
			.setName('song')
			.setDescription('to loop or unloop song'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('playlist')
			.setDescription('playlist'))
	.addSubcommand(subcommand =>
		subcommand.setName('autoplay')
			.setDescription('autoplay'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('off')
			.setDescription('unloop'))
	;


async function execute(commandParams) {
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const { withoutPrefix } = commandParams;
	const queue = useQueue(replyTarget.guildId);
	let { isOn } = commandParams;
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const subcommand = replyTarget.options?._subcommand || withoutPrefix[1].toLowerCase();
	isOn = subcommand == 'off' ? false : isOn;
	if (!isOn) {
		replyTarget.channel.send('loop off');
		return queue.setRepeatMode(0);
	}
	try {
		switch (subcommand) {
		case 'song':
			queue.setRepeatMode(1);
			replyTarget.channel.send('song on loop');
			break;
		case 'playlist':
			queue.setRepeatMode(2);
			replyTarget.channel.send('playlist on loop');
			break;
		case 'autoplay':
			queue.setRepeatMode(3);
			replyTarget.channel.send('autoplay on');
			break;
		}
		return;
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};