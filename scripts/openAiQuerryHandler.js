// Here is an enhanced and improved version of the 'code_under_test' code snippet:

const openAiToken = require('../config.json').openAiToken || process.env['openAiToken'];
const { Configuration, OpenAIApi } = require("openai");
const { bold } = require('discord.js');
const defaultEmbed = require('../embeds/embedTemplate');

const configuration = new Configuration({
	apiKey: openAiToken,
});

const openai = new OpenAIApi(configuration);

/**
 * Generates an answer based on the given prompt.
 * @param {string} prompt - The prompt for generating the answer.
 * @param {Object} commandParams - Parameters for creating an embed.
 * @returns {Promise<Object>} - The embed object with the generated answer.
*/
async function getAnswer(prompt, commandParams) {
	const embed = new defaultEmbed(commandParams);
	await embed.setInfo();

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

		embed.setTitle(bold(prompt))
			.setDescription(textResponse);

		return embed;
	}
	catch (error) {
		console.log(embed);
		await embed.setError();
		return embed;
	}
}

/**
 * Generates an image based on the given prompt.
 * @param {string} prompt - The prompt for generating the image.
 * @param {Object} commandParams - Parameters for creating an embed.
 * @returns {Promise<Object>} - The embed object with the generated image.
 */
async function getImage(prompt, commandParams) {
	const embed = new defaultEmbed(commandParams);
	await embed.setInfo();

	try {
		const response = await openai.createImage({
			prompt: prompt,
			n: 1,
			size: "1024x1024",
		});

		const promptUrl = response.data.data[0].url;
		console.log(promptUrl);

		embed.setTitle(bold(prompt))
			.setImage(promptUrl);

		return embed;
	}
	catch (error) {
		await embed.setError();
		return embed;
	}
}

/**
 * Generates an answer in a chat format based on the given prompt.
 * @param {string} prompt - The prompt for generating the answer.
 * @param {Object} commandParams - Parameters for creating an embed.
 */
async function getAnswerChat(prompt, commandParams) {
	try {
		const response = await openai.createCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		const textResponse = response.choices[0].messages.content;
		console.log(textResponse);

		// const embed = new defaultEmbed(commandParams);
		// await embed.setInfo();
		// embed.setTitle(bold(prompt))
		//   .setDescription(textResponse);

		// return embed;
	}
	catch (error) {
		console.log(error);
		// const embed = new defaultEmbed(commandParams);
		// await embed.setError();
		// return embed;
	}
}

module.exports = {
	getAnswer,
	getImage,
	getAnswerChat,
};