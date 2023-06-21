const axios = require('axios');
const { auth, clientId } = require('../config.json');
const { sfw, nsfw } = require('../src/waifuApi.json');


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
async function changeAvatar(arg) {
	try {
		const imgPath = arg?.includes('http') ? arg : await getRandomWaifu(arg);
		console.log(imgPath);
		const imgResponse = await axios.get(imgPath, { responseType: 'arraybuffer' });
		const imageBuffer = Buffer.from(imgResponse.data, 'binary');
		const base64Image = imageBuffer.toString('base64');
		const dataUrl = `data:image/jpeg;base64,${base64Image}`;
		const payload = {
			username: "Dont know bot",
			avatar: dataUrl };
		const headerData = {
			Authorization: auth,
		};
		const url = `https://discord.com/api/v9/applications/${clientId}/bot`;
		const request = await axios.patch(url, payload, { headers: headerData });
		return request;
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	changeAvatar, getRandomWaifu,
};