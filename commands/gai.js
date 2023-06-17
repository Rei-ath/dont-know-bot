const { SlashCommandBuilder } = require('discord.js');
const { guessByImage } = require('../scripts/rinBotHandler');


const data = new SlashCommandBuilder()
	.setName('gai')
	.setDescription('Stops or start anime guessing from images')
	.addBooleanOption(option =>
		option.setName('toggle')
			.setDescription('Start or stop guessing anime by image')
			.setRequired(true));


const eventEmitter = async msg => {
	try {
		if (msg.author.id == "429656936435286016") {
			const { image: { url } } = msg.embeds[0];
			console.log(url);
			const responseEmbedd = await guessByImage(url);
			return await msg.reply({ embeds: [responseEmbedd] });
		}
	}
	catch {
		console.log("message dont have img");
	}
};

async function execute(funcParams) {
	const { interaction, client, boolean, message } = funcParams;
	const guessAnimeByImgEnabled = interaction ? interaction.options.getBoolean('toggle') : boolean ;
	const targetReply = interaction ? interaction : message;
	console.log(guessAnimeByImgEnabled);
	try {
		if (!guessAnimeByImgEnabled) {
			await client.off('messageCreate', eventEmitter);
			return await targetReply.reply('Guess anime stopped');
		}
		await targetReply.reply('Guess anime started');
		return await client.on('messageCreate', eventEmitter);
	}
	catch {
		console.log('emptional damage in gai.js');
	}
}
module.exports = {
	data, execute,
};