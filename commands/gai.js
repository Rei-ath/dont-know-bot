const { SlashCommandBuilder } = require('discord.js');
const { guessByimage } = require('../scripts/rinBotHandler');


const data = new SlashCommandBuilder()
	.setName('gai')
	.setDescription('Stops or start anime guessing from images')
	.addBooleanOption(option =>
		option.setName('toggle')
			.setDescription('Start or stop guessing anime by image')
			.setRequired(true));

async function execute(funcParams) {
	const {interaction,client,boolean, message} = funcParams;
  const guessAnimeByImgEnabled  = interaction ? interaction.options.getBoolean('toggle') : boolean ;
const targetReply = interaction ? interaction : message;
  try{
		if (!guessAnimeByImgEnabled) return await targetReply.reply('Guess anime stopped');
		await targetReply.reply('Guess anime started');
    const eventEmiter = async msg => {
				try {
      if (msg.author.id == "429656936435286016" && (guessAnimeByImgEnabled)) {
					const { image: { url } } = message.embeds[0];
					const responseEmbedd = await guessByimage(url);
        console.log(`${responseEmbedd}`);
					return await msg.reply({ embeds: [responseEmbedd] });
				}
        }
      catch(e){
        console.log(e);
      }
    }
return await client.on('messageCreate',eventEmiter)
		}

catch(e){
			console.log('emptional damage in gai.js',e);
}
}
module.exports = {
	data, execute,
};