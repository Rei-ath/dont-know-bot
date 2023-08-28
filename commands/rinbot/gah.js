const { SlashCommandBuilder } = require('discord.js');
const { guessByHints } = require('../../scripts/rinBotHandler');
const { metadataExtract } = require('../../utils/deconstructor');


const data = new SlashCommandBuilder()
	.setName('gah')
	.setDescription('Stops or start anime guessing from hints')
	.addBooleanOption(option => option.setName('toggle')
		.setDescription('Start or stop guessing anime from hints')
		.setRequired(true));

const eventEmitter = async message => {
	try {
		const { title } = message.embeds[0];
		console.log(title);
		if (message.author.id == "429656936435286016" && title.includes("Hint")) {
			const responseEmbed = await guessByHints(title);
			// console.log(responseEmbed);
			return await message.reply({ embeds: [responseEmbed] });
		}
	}
	catch {
		console.log("message dont have hint");
	}
};

/**
     * Executes the guessing of anime based on hints.
     *
     * @param {Object} commandParams - The command parameters.
     * @param {Object} commandParams.client - The Discord client object.
     * @param {boolean} commandParams.isOn - The boolean flag indicating if the guessing is on or off.
     * @param {Object} commandParams.interaction - The Discord interaction object.
     * @returns {Promise} A promise that resolves to a message indicating the status of the guessing.
     */
async function execute(commandParams) {

	const { client, isOn, interaction } = commandParams;
	const replyTarget = metadataExtract('replyTarget', commandParams);
	const guessAnimeByHintEnabled = interaction ? interaction.options.getBoolean('toggle') : isOn;
	try {
		if (!guessAnimeByHintEnabled) {
			client.off('messageCreate', eventEmitter);
			return await replyTarget.reply('Guess anime stopped');
		}
		await replyTarget.reply('Guess anime started');
		return await client.on('messageCreate', eventEmitter);
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	data, execute,
};
