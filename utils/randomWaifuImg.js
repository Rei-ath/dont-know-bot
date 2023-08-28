const { sfw, nsfw } = require('../src/waifuApi.json');
const axios = require('axios');

const RandomInt = (max) => Math.floor(Math.random() * max);

/**
     * Retrieves a random image URL from the Waifu API based on the provided arguments.
     * If no arguments are provided, it returns a random SFW (Safe for Work) image URL.
     * If the argument is 'n', it returns a random NSFW (Not Safe for Work) image URL.
     * If the argument is in the format of 'category type', it returns a random image URL based on the specified category and type.
     *
     * @param {Array|string} [arg] - Optional argument. Can be an array or a string.
     * @returns {Promise<string>} - A Promise that resolves to a string representing the URL of a random image from the Waifu API.
     */
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