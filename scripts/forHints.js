const { EmbedBuilder } = require('discord.js');
const { titles } = require('../src/guesses.json');


async function guessNow(hintMessage) {
	try {
		const hintString = hintMessage.substring(hintMessage.indexOf('`') + 1, hintMessage.lastIndexOf('`'));
		const animeEmbedList = new EmbedBuilder()
			.setThumbnail('https://cdn.discordapp.com/emojis/1043810983707164672.webp')
			.setFooter({ text: 'Jang Cutest', iconURL: 'https://cdn.discordapp.com/emojis/1048596660093190164.webp' })
			.setTimestamp();
		console.log(hintString);
		const hintIndices = hintString.split("_").filter(Boolean);
		console.log(hintIndices);
		const matchedAnimeNames = titles.filter(element =>
			element && hintIndices.every((item, index) =>
				element.includes(item) && element.indexOf(item) === hintString.indexOf(item, index),
			) && hintString.length === element.length,
		);
		if (matchedAnimeNames.length > 0) {
			const jangBrain1 = matchedAnimeNames.join(",\n\n");
			animeEmbedList.setColor('Random');
			animeEmbedList.setTitle('Accurate names <:kanna:1039029332707905536>');
			animeEmbedList.setDescription(`\n \n${jangBrain1}`);
			console.log(matchedAnimeNames, 'simple');
		}
		else {
			const notSoAccurateNames = titles.filter(element =>
				element && hintIndices.every(item => element.includes(item)) &&
				hintIndices.some((item, index) => element.indexOf(item) === hintString.indexOf(item, index)) &&
				hintString.length === element.length,
			);
			if (notSoAccurateNames.length > 0) {
				const jangBrain2 = notSoAccurateNames.join(",\n\n");
				animeEmbedList.setTitle('Not soo Accurate names <:kanna:1039029332707905536>');
				animeEmbedList.setColor('Random');
				animeEmbedList.setDescription(`\n \n${jangBrain2}`);
				console.log(matchedAnimeNames, 'not simple');
			}
			else {
				animeEmbedList.setTitle('BRAIN DED');
				animeEmbedList.setColor('Random');
				animeEmbedList.setDescription(`NOT FOUND ANYTHING <:aquacry:1043884919669137478>`);
				console.log(matchedAnimeNames.length, 'nothing');
			}
		}
		return animeEmbedList;
	}
	catch (error) {
		console.log('emotional damage');
	}
}


module.exports = { guessNow };
