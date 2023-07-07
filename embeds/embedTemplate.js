const { EmbedBuilder } = require("discord.js");
const { getRandomWaifu } = require('../utils/randomWaifuImg');
const { metadataExtract } = require("../utils/deconstructor");


class defaultEmbed extends EmbedBuilder {
	constructor(commandParams, ...rest) {
		super(...rest);
		this.commandParams = commandParams;
	}
	async getUserInfo() {
		const { commandParams } = this;
		const { id, avatar, username } = await metadataExtract('userInfo', commandParams);
		this.id = id;
		this.avatar = avatar;
		this.username = username;
	}
	async setInfo() {
		this.setColor(0x0099FF);
		this.setThumbnail(await getRandomWaifu());
		this.setAuthorData();
		this.setTimestamp();
		return Promise.resolve(this);
	}
	async setAuthorData() {
		await this.getUserInfo();
		const { id, avatar, username } = this;
		this.setFooter({ text: 'Jang <3 ||', iconURL: await getRandomWaifu() });
		const avPic = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
		this.setAuthor({
			iconURL: avPic,
			name: id === '532798408340144148' ? '~ Rei' : username || id === '991218096541020220' ? '~ Jang' : username });
	}
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