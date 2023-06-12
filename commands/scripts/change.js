const axios = require('axios');

async function changeAvUsername() {
// axios.get(imageUrl, { responseType: 'arraybuffer' })
	try {
		const imagePath = await axios.get('https://cdn.waifu.im/6929.jpg', { responseType: 'arraybuffer' });
		const imageBuffer = Buffer.from(imagePath.data, 'binary');
		const base64Image = imageBuffer.toString('base64');
		const dataUrl = `data:image/jpeg;base64,${base64Image}`;

		// console.log(dataUrl);

		// console.log(datUrl);
		const data = {
			username: "Dkblol",
			avatar:dataUrl,
		};

		const url = 'https://discord.com/api/v9/applications/1024877744284258364/bot';
		const response = await axios.patch(url, data, {
			headers:{
				Authorization:
"NTMyNzk4NDA4MzQwMTQ0MTQ4.Gf72_m.EUNYPdvtdbYJm0Q9TZ9T52i-woYH8gIz9IJ5fU",
			},
		});
		console.log(response);
	}
	catch (e) {
		console.log(e);
	}
}
module.exports = changeAvUsername;