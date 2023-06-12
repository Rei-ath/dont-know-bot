const axios = require('axios');
const { auth } = require('../../config.json');
async function changeAvUsername(link) {
	try {
		const imgPath = (link) ? link : 'https://cdn.waifu.im/7487.jpg';
		const imgResponse = await axios.get(imgPath, { responseType: 'arraybuffer' });
		const imageBuffer = Buffer.from(imgResponse.data, 'binary');
		const base64Image = imageBuffer.toString('base64');
		const dataUrl = `data:image/jpeg;base64,${base64Image}`;
		const data = {
			username: "Dkblol",
			avatar:dataUrl,
		};
		const url = 'https://discord.com/api/v9/applications/1024877744284258364/bot';
		const request = await axios.patch(url, data, {
			headers:{
				Authorization:auth,
			},
		});
		console.log(request);
	}
	catch (e) {
		console.log(e);
	}
}
// changeAvUsername();
module.exports = changeAvUsername;