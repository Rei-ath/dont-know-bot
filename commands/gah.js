const { SlashCommandBuilder } = require('discord.js');
const { guessByHints } = require('../scripts/rinBotHandler');


const data = new SlashCommandBuilder()
	.setName('gah')
	.setDescription('Stops or start anime guessing from hints')
	.addBooleanOption(option => option.setName('toggle')
		.setDescription('Start or stop guessing anime from hints')
		.setRequired(true));

const eventEmitter = async msg => {
	try {
		const { title } = msg.embeds[0];
		console.log(title);
		if (msg.author.id == "429656936435286016" && title.includes("Hint")) {
			const responseEmbedd = await guessByHints(title);
			console.log(responseEmbedd);
			return await msg.reply({ embeds: [responseEmbedd] });
		}
	}
	catch {
		console.log("message dont have hint");
	}
};

async function execute(funcParams) {
	const { interaction, client, boolean, message } = funcParams;
	const guessAnimeByHintEnabled = interaction ? interaction.options.getBoolean('toggle') : boolean ;
	const targetReply = interaction ? interaction : message;
	try {
		if (!guessAnimeByHintEnabled) {
			client.off('messageCreate', eventEmitter);
			return await targetReply.reply('Guess anime stopped');
		}
		await targetReply.reply('Guess anime started');
		return await client.on('messageCreate', eventEmitter);
	}
	catch {
		console.log('emptional damage in gah.js');
	}
}

module.exports = {
	data, execute,
};
