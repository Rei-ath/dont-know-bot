const { EmbedBuilder } = require('discord.js');
const guessesJSON = require('./guesses.json');


module.exports = {
	async guessNow(hintMessage) {
		try {
			const hintString = hintMessage.substring(hintMessage.indexOf('`') + 1, hintMessage.lastIndexOf('`'));
			const animeEmbedList = new EmbedBuilder()
				.setThumbnail('https://cdn.discordapp.com/emojis/1043810983707164672.webp')
				.setFooter({ text: 'Jang Cutest', iconURL: 'https://cdn.discordapp.com/emojis/1048596660093190164.webp' })
				.setTimestamp();
			console.log(hintString);
			let hintIndices = hintString.split("_");
			hintIndices = hintIndices.filter(element1 => (element1));
			console.log(hintIndices);
			const matchedAnimeNames = [];
			const titles = guessesJSON.titles
			for (const element of titles) {
				if (element) {
					const isEvery = hintIndices.every((item) => element.includes(item) && element.indexOf(item) === hintString.indexOf(item));
					if (isEvery && hintString.length === element.length) {
						matchedAnimeNames.push(element);
					}
				}
			}
			if (matchedAnimeNames.length > 0) {
				const jangBrain1 = matchedAnimeNames.join(",\n\n");
				animeEmbedList.setColor('Random');
				animeEmbedList.setTitle('Accurate names <:kanna:1039029332707905536>');
				animeEmbedList.setDescription(`\n \n${jangBrain1}`);
				console.log(matchedAnimeNames, 'simple');
				return { embeds: [animeEmbedList] };
			}
			else {
				for (const element of titles) {
					if (element) {
						const isEvery = hintIndices.every(item => element.includes(item));
						if (isEvery) {
							const isSome = hintIndices.some((item, index) => element.indexOf(item) == hintString.indexOf(item, index));
							if (isSome && hintString.length === element.length) {
								matchedAnimeNames.push(element);
							}
						}
					}
				}
				if (matchedAnimeNames.length > 0) {
					const jangBrain2 = matchedAnimeNames.join(",\n\n");
					animeEmbedList.setTitle('Not soo Accurate names <:kanna:1039029332707905536>');
					animeEmbedList.setColor('Random');
					animeEmbedList.setDescription(`\n \n${jangBrain2}`);
					console.log(matchedAnimeNames, 'not simple');
					return { embeds: [animeEmbedList] };
				}
				else {
					animeEmbedList.setTitle('BRAIN DED');
					animeEmbedList.setColor('Random');
					animeEmbedList.setDescription(`NOT FOUND ANYTHING <:aquacry:1043884919669137478>`);
					console.log(matchedAnimeNames.length, 'nothing');
					return { embeds: [animeEmbedList] };
				}
			}
		}
		catch (error) {
			console.log('emotional damage');
		}
	}
	,

};
