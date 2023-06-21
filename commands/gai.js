const { SlashCommandBuilder } = require('discord.js');
const { guessByImage } = require('../scripts/rinBotHandler');


const data = new SlashCommandBuilder()
	.setName('gai')
	.setDescription('Stops or start anime guessing from images')
	.addBooleanOption(option =>
		option.setName('toggle')
			.setDescription('Start or stop guessing anime by image')
			.setRequired(true));


const eventEmitter = async message => {
	try {
		if (message.author.id == "429656936435286016") {
			const { image: { url } } = message.embeds[0];
			console.log(url);
			const responseEmbed = await guessByImage(url);
			return await message.reply({ embeds: [responseEmbed] });
		}
	}
	catch {
		console.log("message dont have image");
	}
};

async function execute(commandParams) {
	const { interaction, client, isOn, message } = commandParams;
	const guessAnimeByImgEnabled = interaction ? interaction.options.getBoolean('toggle') : isOn ;
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
	catch (error) {
		console.error(error);
	}
}
module.exports = {
	data, execute,
};