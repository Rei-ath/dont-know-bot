const { SlashCommandBuilder } = require('discord.js');
const { guessByHints } = require('../scripts/rinBotHandler');


const data = new SlashCommandBuilder()
	.setName('gah')
	.setDescription('Stops or start anime guessing from hints')
	.addBooleanOption(option => option.setName('toggle')
		.setDescription('Start or stop guessing anime from hints')
		.setRequired(true));

async function execute(funcParams) {
	const interaction = funcParams.interaction;
	const client = funcParams.client;
	if (interaction) {
		const guessAnimeByHintEnabled = interaction.options.getBoolean('toggle');
		if (!guessAnimeByHintEnabled) {
			return await interaction.reply('Guess anime stopped');
		}
		await interaction.reply('Guess anime started');
		client.on("messageCreate", async (message) => {
			try {
				const hintMessage = message.embeds[0].data.title;
				if (message.author.id == "429656936435286016" && hintMessage.includes("Hint") && guessAnimeByHintEnabled) {
					console.log(hintMessage);
					const responseEmbedd = await guessByHints(hintMessage);
					return await message.reply({ embeds:[responseEmbedd] }) ;
				}
			}
			catch {
				console.log("this message doesnt have hint");
			}
		});
	}
	else {
		try {
			const guessAnimeByHintEnabled = funcParams.boolean;
			if (!guessAnimeByHintEnabled) return await funcParams.message.channel.send('anime by hint stopped');
			console.log('started');
			await funcParams.message.reply('started');
			client.on("messageCreate", async (message) => {
				try {
					const hintMessage = message.embeds[0].data.title;
					if (message.author.id == "429656936435286016" && hintMessage.includes("Hint") && guessAnimeByHintEnabled) {
						console.log(hintMessage);
						const responseEmbedd = await guessByHints(hintMessage);
						return await message.reply({ embeds:[responseEmbedd] }) ;
					}
				}
				catch {
					console.log("this message doesnt have hint");
				}
			});
		}
		catch (error) {
			console.log('emptional damage in gah.js');
		}
	}
}
module.exports = {
	data, execute,
};