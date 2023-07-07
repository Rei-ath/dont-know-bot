// Import dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { loadAll, options } = require('./utils/loader');
// Create Discord client
const client = new Client(options);
loadAll(client);


// Import and configure modules
const {InitPlayer } = require('./player');
InitPlayer(client);

// Log in the client
const discordToken = process.env.TOKEN || require('./config.json').token;
client.login(discordToken);

// Main execution code