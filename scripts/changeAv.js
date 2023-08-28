const axios = require('axios');
const auth = process.env['auth']||require('../config.json').auth;
const clientId = require('../config.json').clientId || process.env['clientId'];
const { getRandomWaifu } = require('../utils/randomWaifuImg');

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
	changeAvatar,
};