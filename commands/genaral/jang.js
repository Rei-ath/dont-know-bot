/**
 * Defines a function called `execute` that takes in a parameter called `commandParams`.
 * The function checks if the `commandParams` object has a property called `interaction`.
 * If it does, it uses the `interaction.reply` method to send a message saying "shes the cutest".
 * If the `commandParams` object does not have an `interaction` property, it uses the `message.channel.send` method to send the same message.
 * The function is wrapped in a try-catch block to handle any errors that may occur.
 *
 * @param {Object} commandParams - The command parameters object.
 * @returns {Promise} - A promise that resolves when the message is sent.
 * @throws {Error} - If an error occurs while sending the message.
 */
const execute = async (commandParams) => {
	try {
		if (commandParams.interaction) {
			return await commandParams.interaction.reply('shes the cutest');
		}
		else {
			return await commandParams.message.channel.send('shes the cutest');
		}
	}
	catch (error) {
		console.error(error);
		throw new Error('Error sending message');
	}
};

module.exports = {
	execute,
};