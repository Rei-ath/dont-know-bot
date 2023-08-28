const { Events } = require('discord.js');

const name = Events.MessageCreate;

/**
     * Executes a command based on the provided message.
     *
     * @param {object} message - The message object containing the command.
     * @returns {Promise} - A promise that resolves with the result of the command execution.
     */
async function execute(message) {

	if (!message) return;
	try {
		const messageCommand = message.content;
		if (messageCommand.indexOf('02') !== 0) return;
		let withoutPrefix = messageCommand.slice(2).trim();
		withoutPrefix = withoutPrefix.split(/\s+/g);
		const command = message.client.commands.get(withoutPrefix[0]?.toLowerCase());
		if (!command) return;
		console.log(withoutPrefix);
		const commandParams = {
			'client': message.client,
			'message': message,
			'withoutPrefix': withoutPrefix,
			'isOn': true,
		};
		commandParams.isOn = withoutPrefix[1]?.toLowerCase() == 'off' ? false : true;
		return await command.execute(commandParams);
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = { name, execute };