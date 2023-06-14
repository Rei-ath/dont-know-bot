const { openAiToken } = require('../../config.json');
const { Configuration, OpenAIApi } = require("openai");
const { EmbedBuilder, bold } = require('discord.js');
const configuration = new Configuration({
	apiKey: openAiToken,
});
const openai = new OpenAIApi(configuration);
const responseEmbedd = new EmbedBuilder()
	.setThumbnail('https://cdn.discordapp.com/avatars/1024877744284258364/6f9f1bc9f3e1347c4a793db9df028843.webp')
	.setFooter({ text: 'Jang <3 ||', iconURL: 'https://cdn.discordapp.com/avatars/991218096541020220/2893b364fb9f5058b7ae563ef73ccaac.webp?' })
	.setTimestamp();

let prompt, user_id, user_avatar, username, withoutPrefix, message;

async function answer(funcParams) {
	try {
		const interaction = funcParams.interaction;
		if (interaction) {
			prompt = await interaction.options.getString('q');
			user_id = interaction.author.id;
			user_avatar = interaction.author.avatar;
			username = interaction.author.username;
		}
		else {
			message = funcParams.message;
			withoutPrefix = funcParams.withoutPrefix;
			user_id = message.author.id;
			user_avatar = message.author.avatar;
			username = message.author.username;
			withoutPrefix.shift();
			prompt = withoutPrefix.join(' ');
		}
		console.log(prompt);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 0.4,
			max_tokens: 2000,
			n: 1,
		});
		const textResponse = response.data.choices[0].text;
		responseEmbedd.setTitle(`${bold(prompt)}`)
			.setDescription(`${textResponse}`);
		if (user_id == '532798408340144148') {
			responseEmbedd.setAuthor({ name: `~ rei`, iconURL: `https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.png` });
		}
		else {
			responseEmbedd.setAuthor({ name: `${username}`, iconURL: `https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.png` });
		}
		return responseEmbedd;
	}
	catch (error) {
		console.error(error);
	}
}


async function image(funcParams) {
	try {
		const interaction = funcParams.interaction;
		if (interaction) {
			prompt = await interaction.options.getString('q');
			user_id = interaction.author.id;
			user_avatar = interaction.author.avatar;
			username = interaction.author.username;
		}
		else {
			message = funcParams.message;
			withoutPrefix = funcParams.withoutPrefix;
			user_id = message.author.id;
			user_avatar = message.author.avatar;
			username = message.author.username;
			withoutPrefix.shift();
			prompt = withoutPrefix.join(' ');
		}
		console.log(prompt);
		const response = await openai.createImage({
			prompt:prompt,
			n: 1,
			size: "1024x1024",
		});
		const textResponse = response.data.data[0].url;
		console.log(textResponse);
		if (user_id == '532798408340144148') {
			responseEmbedd.setAuthor({ name: `rei`, iconURL: `https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.png` });
		}
		else {
			responseEmbedd.setAuthor({ name: `${username}`, iconURL: `https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.png` });
		}
		responseEmbedd.setTitle(`${bold(prompt)}`)
			.setImage(textResponse);
		return responseEmbedd;
	}
	catch (error) {
		console.error(error);
	}
}
module.exports = {
	answer, image,
};