/**
 * Extracts specific metadata based on the given type and command parameters.
 * @param {string} type - The type of metadata to extract. Must be one of: 'replyTarget', 'userInfo', 'q', 'query'.
 * @param {object} commandParams - An object containing the necessary properties for extracting the metadata.
 * @returns {object|string} - The extracted metadata based on the type parameter and commandParams object.
 * @throws {Error} - If the type parameter is invalid or the commandParams parameter is not of the correct type.
 */
const metadataExtract = (type, commandParams) => {
	if (typeof type !== 'string' || typeof commandParams !== 'object') {
		throw new Error('Type must be a string and commandParams must be an object');
	}

	const { interaction, message, withoutPrefix } = commandParams;

	switch (type) {
	case 'replyTarget':
		return interaction || message;

	case 'userInfo':
		// eslint-disable-next-line no-case-declarations
		const { user, author } = interaction || message;
		return user || author;

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
