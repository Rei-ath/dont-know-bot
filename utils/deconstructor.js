const metadataExtract = (type, commandParams) => {
	if (typeof type !== 'string' || typeof commandParams !== 'object') return new Error('type must be string and commandParams must be an object');
	const typeArr = ['replyTarget', 'userInfo', 'q', 'query'];
	if (!type || !typeArr.includes(type)) return new Error(`string must have any from these ${typeArr}`);
	// if (Object.keys({}).length === 0) return new Error(`object must not be empty`);
	try {
		const { interaction, message, withoutPrefix } = commandParams;
		const replyMetadata = interaction || message;
		if (type === typeArr[0]) return replyMetadata;

		const { user, author } = interaction || message;
		const userInfo = user || author;
		if (type === typeArr[1]) return userInfo;

		let prompt ;
		if (type === typeArr[2]) return prompt = interaction ? interaction.options.getString('q') : withoutPrefix.slice(1).join(' ');
		prompt = interaction ? interaction.options.getString('query') : withoutPrefix.slice(1).join(' ');

		if (type === typeArr[3]) return prompt;
	}
	catch (error) {
		console.log(error);
	}
};

module.exports = {
	metadataExtract,
};