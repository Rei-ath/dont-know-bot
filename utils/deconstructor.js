const metadataExtract = (type, commandParams) => {
	if (typeof type !== 'string' || typeof commandParams !== 'object') {
		throw new Error('Type must be a string and commandParams must be an object');
	}
	const { interaction, message, withoutPrefix } = commandParams;
	switch (type) {
	case 'replyTarget':
		return interaction || message;
	case 'userInfo': {
		const { user, author } = interaction || message;
		return user || author;
	}
	case 'q':
		return interaction ? interaction.options.getString('q') : withoutPrefix.slice(1).join(' ');
	case 'query':
		return interaction ? interaction.options.getString('query') : withoutPrefix.slice(1).join(' ');
	default:
		throw new Error(`Invalid type. Must be one of: replyTarget, userInfo, q, query`);
	}
};

module.exports = {
	metadataExtract,
};
