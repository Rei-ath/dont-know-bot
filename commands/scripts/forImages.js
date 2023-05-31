const { EmbedBuilder } = require('discord.js');

module.exports = {
	async animeImg(message) {
		try {
			const { image: { url } } = message.embeds[0];
			const data = await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`).then(response => response.json());
			const titles = data.result.map(item => item.anilist.title.english).filter(title => title !== null);
			const reiBrain = titles.join(",\n ");
			console.log(reiBrain);
			const animeEmbedList = new EmbedBuilder()
				.setColor('Random')
				.setTitle('BY image <:aaaaaaaaaaaaaaaaaa:1028855240293888100>')
				.setDescription(`\n \n${reiBrain}`)
				.setThumbnail('https://cdn.discordapp.com/emojis/1047138942945853440.webp')
				.setFooter({ text: 'Jang Cutest', iconURL: 'https://cdn.discordapp.com/emojis/1048596660093190164.webp' })
				.setTimestamp();
			return { embeds: [animeEmbedList] };
		}
		catch (error) {
			console.log('Error:');
		}
	},
};