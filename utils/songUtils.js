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
	// Move track from queue[fromIdx...toIdx] to start position
	for (let fromIdx = from, startPos = 0; num > 0; ++fromIdx, ++startPos, --num) {
		queue.node.move(fromIdx, startPos);
	}
	if (withSkip) {
		// Play next song from the queue
		queue.node.skip();
	}
	return true;
};

const useResume = (guildId) => {
	const queue = useQueue(guildId);
	if (queue && queue.node.isPaused()) {
		queue.node.setPaused(false);
	}
};

module.exports = {
	useMoveToStart, useResume,
};