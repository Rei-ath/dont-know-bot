const { EmbedBuilder } = require("discord.js");
const { getRandomWaifu } = require('../utils/randomWaifuImg');
const { metadataExtract } = require("../utils/deconstructor");


class defaultEmbed extends EmbedBuilder {
	/**
     * Represents an embed message builder for Discord.
     * @extends EmbedBuilder
     */
	constructor(commandParams, ...rest) {
		super(...rest);
		/**
         * The command parameters passed to the constructor.
         * @type {any}
         */
		this.commandParams = commandParams;
	}

	/**
     * Retrieves user information using the metadataExtract function and sets the id, avatar, and username properties of the embed.
     * @returns {Promise<void>}
     */
	async getUserInfo() {
		const { commandParams } = this;
		const { id, avatar, username } = await metadataExtract('userInfo', commandParams);
		/**
         * The user ID retrieved from getUserInfo().
         * @type {string}
         */
		this.id = id;
		/**
         * The user avatar retrieved from getUserInfo().
         * @type {string}
         */
		this.avatar = avatar;
		/**
         * The username retrieved from getUserInfo().
         * @type {string}
         */
		this.username = username;
	}

	/**
     * Sets the color, thumbnail, author, and timestamp properties of the embed.
     * @returns {Promise<defaultEmbed>}
     */
	async setInfo() {
		this.setColor(0x0099FF);
		this.setThumbnail(await getRandomWaifu());
		this.setAuthorData();
		this.setTimestamp();
		return Promise.resolve(this);
	}

	/**
     * Calls getUserInfo() to retrieve user information and sets the author properties of the embed based on the user's ID.
     * @returns {Promise<void>}
     */
	async setAuthorData() {
		await this.getUserInfo();
		const { avatar, id } = this;
		let { username } = this;
		switch (id) {
		case '532798408340144148':
			username = '~ Rei';
			break;
		case '991218096541020220':
			username = '~ Jang';
			break;
		default:
			break;
		}
		this.setFooter({ text: 'Jang <3 ||', iconURL: await getRandomWaifu() });
		const avPic = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
		this.setAuthor({
			iconURL: avPic,
			name: username,
		});
	}

	/**
     * Calls setAuthorData() to set the author properties of the embed and sets specific properties for an error message.
     * @returns {Promise<defaultEmbed>}
     */
	async setError() {
		await this.setAuthorData();
		this.setTitle('Error desu :/');
		this.setImage(await getRandomWaifu('bully'));
		this.setThumbnail(await getRandomWaifu('smug'));
		this.setFooter({ text: '[ Jang ]', iconURL: await getRandomWaifu('poke') });
		this.setDescription(`sorry error occured`);
		return Promise.resolve(this);
	}
}

module.exports = defaultEmbed;