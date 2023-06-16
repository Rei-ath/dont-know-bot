const { openAiToken } = require('../config.json');
const { Configuration, OpenAIApi } = require("openai");
const { EmbedBuilder, bold } = require('discord.js');
const configuration = new Configuration({
	apiKey: openAiToken,
});
const { getRandomWaifu } = require('./changeAv');
const openai = new OpenAIApi(configuration);
const responseEmbed = new EmbedBuilder()
	.setTimestamp();

async function getAnswer(prompt) {
	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 0.4,
			max_tokens: 2000,
			n: 1,
		});
		const textResponse = response.data.choices[0].text;
		responseEmbed.setTitle(bold(prompt))
			.setThumbnail(await getRandomWaifu())
			.setFooter({ text: 'Jang <3 ||', iconURL: await getRandomWaifu() })
			.setDescription(textResponse);
		return responseEmbed;
	}
	catch (error) {
		responseEmbed.setTitle(`${bold(prompt)}`)
			.setThumbnail(await getRandomWaifu())
			.setFooter({ text: 'Jang <3 ||', iconURL: await getRandomWaifu() })
			.setDescription(`sorry error occured`);
		return responseEmbed;
	}
}


async function getImage(prompt) {
	try {
		const response = await openai.createImage({
			prompt:prompt,
			n: 1,
			size: "1024x1024",
		});
		const promptUrl = response.data.data[0].url;
		console.log(promptUrl);
		responseEmbed.setTitle(`${bold(prompt)}`)
			.setImage(promptUrl);
		return responseEmbed;
	}
	catch (error) {
		responseEmbed.setTitle(bold(prompt))
			.setImage(await getRandomWaifu('bully'))
			.setThumbnail(await getRandomWaifu('smug'))
			.setFooter({ text: '[ Jang ]', iconURL: await getRandomWaifu('poke') })
			.setDescription(`sorry error occured`);
		return responseEmbed;
	}
}
module.exports = {
	getAnswer, getImage,
};