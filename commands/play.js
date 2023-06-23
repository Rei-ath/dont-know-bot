const { SlashCommandBuilder } = require('discord.js');


const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('track to play')
	.addStringOption(option => option
		.setName('query')
		.setDescription('enter ur track')
		.setRequired(true),
	);

async function execute(commandParams) {
	const { interaction, message, withoutPrefix, client } = commandParams;
	const { user, author } = interaction || message;
	// const { id, avatar, username } = user || author;
	const replyTarget = interaction || message;
	const prompt = interaction ? interaction.options.getString('query') : withoutPrefix.slice(1).join(' ');
	console.log(prompt);
	try {
		const { manager } = client;
		// if (!replyTarget.member.voice.channel) {
		// 	return replyTarget.reply(
		// 		"❌ | **You must be in a voice channel to play something!**",
		// 	);
		// }
		console.log(manager)
		if (!manager) {
			await replyTarget.reply('Lavalink manager is not available.');
			return;
		}
		const res = await client.manager.search(
			prompt,
			author || user,
		);
		const player = client.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id,
		});
		player.connect();
		player.queue.add(res.tracks[0]);
		message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);
		if (!player.playing && !player.paused && !player.queue.size) {player.play();}
		if (
			!player.playing &&
        !player.paused &&
        player.queue.totalSize === res.tracks.length
		) {player.play();}
	}
	catch (error) {
		console.log(error);
	}
}


// console.log(data);
module.exports = {
	data, execute,
};