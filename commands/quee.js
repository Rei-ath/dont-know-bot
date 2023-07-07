const { SlashCommandBuilder } = require('@discordjs/builders');
const { metadataExtract } = require('../utils/deconstructor');
const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { prepareSongTitle } = require('../utils/songUtils');


const data = new SlashCommandBuilder()
	.setName('quee')
	.setDescription('Get a list of songs from the current queue');

const first = new ButtonBuilder()
	.setCustomId('firstPage')
	.setLabel('FirstPage')
	.setStyle(ButtonStyle.Secondary);

const previous = new ButtonBuilder()
	.setCustomId('previosPage')
	.setLabel('PreviosPage')
	.setStyle(ButtonStyle.Secondary);

const next = new ButtonBuilder()
	.setCustomId('nextPage')
	.setLabel('NextPage')
	.setStyle(ButtonStyle.Secondary);

const last = new ButtonBuilder()
	.setCustomId('lastPage')
	.setLabel('LastPage')
	.setStyle(ButtonStyle.Secondary);

const row = new ActionRowBuilder()
	.addComponents(first, previous, next, last);
let collector;

async function execute(commandParams) {
	const { client } = commandParams;
	const replyTarget = await metadataExtract('replyTarget', commandParams);
	const voice = replyTarget.member.voice.channelId;
	if (!voice) return replyTarget.channel.send('Join a Channel First');
	const queue = client.player.queues.get(replyTarget.guildId);
	const { id } = await metadataExtract('userInfo', commandParams);

	if (!queue) {
		return await replyTarget.reply('There is no queue');
	}
	const nextTracks = queue.tracks.data.map(prepareSongTitle);
	let currentPage = 0;
	const tracksPerPage = 10;
	const totalPages = Math.ceil(nextTracks.length / tracksPerPage);
	const embed = new EmbedBuilder().setTitle(`page ${currentPage + 1}/${totalPages}`).setDescription(nextTracks.slice(0, tracksPerPage).join('\n'));
	try {
		const filter = (interaction) => interaction.isButton() && interaction.user.id === id;
		const dividedArr = () => {
			const start = currentPage * tracksPerPage;
			const end = Math.min(start + tracksPerPage, nextTracks.length);
			return nextTracks.slice(start, end);
		};

		if (!collector) {
			collector = replyTarget.channel.createMessageComponentCollector({ componentType: 2, filter });
			collector.on('collect', async (i) => {
				try {
					if (i.customId === 'firstPage') {
						currentPage = 0;
					}
					else if (i.customId === 'nextPage') {
						currentPage = (currentPage + 1 + totalPages) % totalPages;
					}
					else if (i.customId === 'previousPage') {
						currentPage = (currentPage - 1 + totalPages) % totalPages;
					}
					else if (i.customId === 'lastPage') {
						currentPage = totalPages - 1;
					}
					embed.setTitle(`page ${currentPage + 1}/${totalPages}`).setDescription(dividedArr().join('\n'));
					await i.update({ embeds: [embed], components: [row] });
				}
				catch (error) {
					console.log(error.status);
				}
			});
		}
		if (!commandParams.button) {
			await replyTarget.reply({ embeds: [embed], components: [row] });
		}
	}
	catch (e) {
		console.log(e);
	}
}


module.exports = { data, execute, row };



