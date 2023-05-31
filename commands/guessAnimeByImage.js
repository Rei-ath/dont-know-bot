const { SlashCommandBuilder } = require('discord.js');
const { animeImg } = require('./scripts/forImages');
let guessAnimeByImgEnabled = true;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gai')
		.setDescription('Stops or start anime guessing from images')
		.addBooleanOption(option =>
			option.setName('toggle')
				.setDescription('Start or stop guessing anime by image')
				.setRequired(true)),
	async executeInteractionCmd(funcParams) {
		const interaction = funcParams.interaction;
		const client = funcParams.client;
		guessAnimeByImgEnabled = interaction.options.getBoolean('toggle');
		if (interaction) {
			if (!guessAnimeByImgEnabled) return await interaction.reply('Guess anime stopped');
			await interaction.reply('Guess anime started');
			client.on("messageCreate", async message => {
				try {
					if (message.author.id == "429656936435286016" && (guessAnimeByImgEnabled)) {
						console.log('interactoion laga');
						const responseEmbedd = await animeImg(message);
						return await message.reply(responseEmbedd) ;
					}
				}
				catch {
					console.log("this message doesnt have imange");
				}
			});
		}
		else {
			try {
				guessAnimeByImgEnabled = funcParams.boolean;
				if (!guessAnimeByImgEnabled) return;
				console.log('started');
				await funcParams.message.reply('started');
				client.on('messageCreate', async (message) => {
					try {
						if (message.author.id == "429656936435286016" && guessAnimeByImgEnabled) {
							console.log('message laga');
							const responseEmbedd = await animeImg(message);
							return await message.reply(responseEmbedd) ;
						}
					}
					catch {
						console.log("this message doesnt have imange");
					}
				});
			}
			catch {
				console.log('emptional damage in gai.js');
			}
		}
	},
};


// var findMedianSortedArrays = function(nums1, nums2) {
//     const mergedArr = nums1.concat(nums2);
//     mergedArr.sort((a,b)=>{return a-b});
//     console.log(mergedArr);
//     const arrLength = mergedArr.length/2;
//     console.log('first',arrLength);
//     let mean = mergedArr[0];
//     if (arrLength<1)return mean;
//     console.log(arrLength%2,'reminder')
//     if(arrLength%2<=1){
//         console.log('yes',mergedArr[Math.floor(arrLength)]);
//         mean= (mergedArr[Math.floor(arrLength)-1]+mergedArr[Math.floor(arrLength)])/2;
//     }
//     else{
//         console.log('no',Math.round(arrLength));
//         mean= mergedArr[Math.floor(arrLength)]
//     }
//     console.log(mean,'mean')
//     // if(mean<1 || mean>0)  return Math.floor(mean);
//     if((!mean))return 0;
//     return mean;
// };