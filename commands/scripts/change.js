const axios = require('axios');
const { auth } = require('../../config.json');


async function changeAvUsername(link) {
	try {
		const getRandomWaifu = async () => {
			const response = await import('node-fetch');
			const fetch = response.default;
			const imgResponse = await fetch('https://api.waifu.pics/sfw/waifu');
			const img = await imgResponse.json();
			return await img.url;
		};
		const imgPath = await (link ? link : getRandomWaifu());
    console.log(imgPath)
		const imgResponse = await axios.get(imgPath, { responseType: 'arraybuffer' });
    console.log(imgResponse.data)
		const imageBuffer =  Buffer.from(imgResponse.data, 'binary');
		const base64Image = imageBuffer.toString('base64');
		const dataUrl =  `data:image/jpeg;base64,${base64Image}`;
		const data = {
			username: "Dont know bot",
			avatar: dataUrl,
		};
		const url = 'https://discord.com/api/v9/applications/1024877744284258364/bot';
		const request = await axios.patch(url, data, {
			headers: {
				Authorization: auth,
			},
		});
		return await request;
	}
	catch (e) {
		console.log(e);
	}
}
<<<<<<< HEAD
=======
// changeAvUsername('https://i.waifu.pics/vi9hgee.jp')
>>>>>>> 8d031bc0c17fb2fe2e40d9b6d4bd597c6d35b82d
module.exports = { changeAvUsername };