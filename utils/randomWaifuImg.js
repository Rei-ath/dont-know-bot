const { sfw, nsfw } = require('../src/waifuApi.json');
const axios = require('axios');

const RandomInt = (max) => Math.floor(Math.random() * max);

const getRandomWaifu = async (arg) => {
	if (!arg) {
		const sfwLen = sfw.length;
		const randomCat = sfw[RandomInt(sfwLen)];
		const imgResponse = await axios.get(`https://api.waifu.pics/sfw/${randomCat}`);
		const { data } = await imgResponse;
		console.log(randomCat);
		return data.url;
	}
	if (arg.length === 1 && arg[0] === 'n') {
		const nsfwLen = nsfw.length;
		const randomCat = nsfw[RandomInt(nsfwLen)];
		const imgResponse = await axios.get(`https://api.waifu.pics/nsfw/${randomCat}`);
		const { data } = imgResponse;
		console.log(randomCat);
		return data.url;
	}
	const argArr = arg.split(' ');
	const type = argArr[1] === 'n' ? `nsfw` : `sfw`;
	const category = argArr[0];
	const imgResponse = await axios.get(`https://api.waifu.pics/${type}/${category}`);
	const img = imgResponse.data;
	return img.url;
};

module.exports = {
	getRandomWaifu,
};