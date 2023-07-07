const { EmbedBuilder } = require("discord.js");

class playEmbed extends EmbedBuilder {
	constructor(track, ...rest) {
		super(...rest);
		this.track = track;
	}

	prepareSongStartedEmbed() {
		const { track } = this;
		this.setTitle(track.title);
		this.setURL(track.url);
		this.setRawFields(track);
		this.setRawFields(track, this);
		return this;
	}
	setRawFields(track) {
		const { author, description, source, duration } = track;
		this.setDescription(description);
		this.setFooter({ text:`Duration: ${duration.toString()} Source: ${source}` });
		this.setAuthor({ name: author });
		if (source === 'spotify') {
			this.setColor(0x1DB954);
			return this.setThumbnail(track.thumbnail);
		}
		this.setColor(0xFF0000);
		this.setImage(track.thumbnail);
	}
}
// console.log(new playEmbed());
module.exports = playEmbed;
