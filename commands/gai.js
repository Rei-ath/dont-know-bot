const { SlashCommandBuilder } = require('discord.js');
const { animeImg } = require('../scripts/forImages');


const data = new SlashCommandBuilder()
	.setName('gai')
	.setDescription('Stops or start anime guessing from images')
	.addBooleanOption(option =>
		option.setName('toggle')
			.setDescription('Start or stop guessing anime by image')
			.setRequired(true));

async function execute(funcParams) {
	const interaction = funcParams.interaction;
	const client = funcParams.client;
	if (interaction) {
		const guessAnimeByImgEnabled = interaction.options.getBoolean('toggle');
		if (!guessAnimeByImgEnabled) return await interaction.reply('Guess anime stopped');
		await interaction.reply('Guess anime started');
		client.on("messageCreate", async message => {
			try {
				if (message.author.id == "429656936435286016" && (guessAnimeByImgEnabled)) {
					console.log('interactoion on');
					const { image: { url } } = message.embeds[0];
					const responseEmbedd = await animeImg(url);
					return await message.reply({ embeds: [responseEmbedd] });
				}
			}
			catch {
				console.log("this message doesnt have imange");
			}
		});
	}
	else {
		try {
			const guessAnimeByImgEnabled = funcParams.boolean;
			if (!guessAnimeByImgEnabled) return;
			console.log('started');
			await funcParams.message.reply('started');
			client.on('messageCreate', async (message) => {
				try {
					if (message.author.id == "429656936435286016" && guessAnimeByImgEnabled) {
						console.log('message on');
						const { image: { url } } = message.embeds[0];
						const responseEmbedd = await animeImg(url);
						return await message.reply({ embeds: [responseEmbedd] });
					}
				}
				catch {
					console.log("this message doesnt have imange");
				}
			});
		}
		catch {
			console.log('emptional damage in gai.js');
		}
	}
}

module.exports = {
	data, execute,
};