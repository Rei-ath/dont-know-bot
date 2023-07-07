// Import dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');
const keepAlive = require('./server')
const Monitor = require('ping-monitor')

// Load environment variables
dotenv.config();

const { loadAll, options } = require('./utils/loader');
// Create Discord client
const client = new Client(options);
loadAll(client);

//hosting bot
keepAlive()
const monitor = new Monitor({
  website:'',
  title:'DKB',
  interval:2
})
monitor.on('up',res=>console.log(`${res.website} alive`))
monitor.on('down',res=>console.log(`${res.website} ded ded as hell`))
monitor.on('stop',website=>console.log(`${website} went bruh`))
monitor.on('error',error=>console.log(`error`))

// Import and configure modules
const {InitPlayer } = require('./player');
InitPlayer(client);

// Log in the client
const discordToken = process.env['token']|| require('./config.json').token;
client.login(discordToken);

// Main execution code