const axios = require('axios');
const { auth } = require('../../config.json');
const fetch = require('node-fetch');

async function changeAvUsername(link) {
  try {
    const getRandomWaifu = async () => {
      const response = await fetch('https://api.waifu.pics/sfw/waifu');
      const img = await response.json()
      return await img.url;
    };
    const imgPath = await (link ? link : getRandomWaifu());
    const imgResponse = await axios.get(imgPath, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imgResponse.data, 'binary');
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    const data = {
      username: "Dkblol",
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
// changeAvUsername();
module.exports = { changeAvUsername };