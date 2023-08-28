const { EmbedBuilder } = require("discord.js");

/**
 * Represents an embed message for a music track that is being played.
 * Extends the EmbedBuilder class from the discord.js library.
 */
class playEmbed extends EmbedBuilder {
	/**
   * Constructs a new instance of the playEmbed class.
   * @param {Object} track - The music track being played.
   * @param {...any} rest - Additional parameters for the EmbedBuilder constructor.
   */
	constructor(track, ...rest) {
		super(...rest);
		this.track = track;
	}

	/**
   * Prepares the embed message for the song that is being played.
   * Sets the title, URL, description, author, source, duration, thumbnail, and color based on the properties of the track.
   * @returns {playEmbed} The prepared playEmbed instance.
   */
	prepareSongStartedEmbed() {
		const { track } = this;
		this.setTitle(track.title);
		this.setURL(track.url);
		this.setRawFields(track);
		this.setRawFields(track, this);
		return this;
	}

	/**
   * Sets the description, footer, author, thumbnail, and color of the embed message based on the properties of the track.
   * @param {Object} track - The music track being played.
   */
	setRawFields(track) {
		const { author, description, source, duration } = track;
		this.setDescription(description);
		this.setFooter({ text: `Duration: ${duration.toString()} Source: ${source}` });
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
