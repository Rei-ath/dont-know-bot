const { useQueue } = require('discord-player');


const useMoveToStart = ({ from, num, guildId, withSkip = true }) => {
	const queue = useQueue(guildId);
	if (!queue) {
		return false;
	}
	const isAlreadyInQueue = queue.tracks.data.length <= num;
	if (isAlreadyInQueue) {
		return false;
	}
	for (let fromIdx = from, startPos = 0; num > 0; ++fromIdx, ++startPos, --num) {
		queue.node.move(fromIdx, startPos);
	}
	if (withSkip) {
		queue.node.skip();
	}
	return true;
};

const useResume = (guildId) => {
	const queue = useQueue(guildId);
	if (queue && queue.node.isPaused()) {
		queue.node.setPaused(false);
	}
	if (!queue) {
		queue.setRepeatMode(3);
		queue.node.setPaused(false);
	}
};

const prepareSongTitle = ({ title, author }, index) => {
	return `[${index + 1}] ` + title + ' by ' + '**' + author + '**';
};

module.exports = {
	useMoveToStart, useResume,prepareSongTitle,
	// repeatMode
};