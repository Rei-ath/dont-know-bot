const { EmbedBuilder } = require('discord.js');


async function animeImg(url) {
	try {
		const data = await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`).then(response =>
			response.ok ? response.json() : Promise.reject(new Error('API request failed.')));
		const titles = data.result.map(item => item.anilist.title.english).filter(Boolean);
		const reiBrain = titles.join(",\n");
		console.log(reiBrain);
		const animeEmbedList = new EmbedBuilder()
			.setColor('Random')
			.setTitle('BY image <:aaaaaaaaaaaaaaaaaa:1028855240293888100>')
			.setDescription(`\n \n${reiBrain}`)
			.setThumbnail('https://cdn.discordapp.com/emojis/1047138942945853440.webp')
			.setFooter({ text: 'Jang Cutest', iconURL: 'https://cdn.discordapp.com/emojis/1048596660093190164.webp' })
			.setTimestamp();
		return animeEmbedList;
	}
	catch (error) {
		console.log('Error:');
	}
}
module.exports = {
	animeImg,
};