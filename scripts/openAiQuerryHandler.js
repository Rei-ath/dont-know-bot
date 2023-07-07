const openAiToken = require('../config.json').openAiToken || process.env['openAiToken'];
const { Configuration, OpenAIApi } = require("openai");
const { bold } = require('discord.js');
const configuration = new Configuration({
	apiKey: openAiToken,
});
const defaultEmbed = require('../embeds/embedTemplate');
const openai = new OpenAIApi(configuration);


async function getAnswer(prompt, commandParams) {
	const Embed = new defaultEmbed(commandParams);
	await Embed.setInfo();
	// console.log(await Embed)
	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 0.4,
			max_tokens: 2000,
			n: 1,
		});
		const textResponse = response.data.choices[0].text;
		console.log(textResponse);
		Embed.setTitle(bold(prompt))
			.setDescription(textResponse);
		return Embed;
	}
	catch (error) {
		console.log(Embed);
		await Embed.setError();
		return Embed;
	}
}


async function getImage(prompt, commandParams) {
	const Embed = new defaultEmbed(commandParams);
	await Embed.setInfo();
	try {
		const response = await openai.createImage({
			prompt:prompt,
			n: 1,
			size: "1024x1024",
		});
		const promptUrl = response.data.data[0].url;
		console.log(promptUrl);
		Embed.setTitle(bold(prompt))
			.setImage(promptUrl);
		return Embed;
	}
	catch (error) {
		await Embed.setError();
		return Embed;
	}
}
module.exports = {
	getAnswer, getImage,
};