require('dotenv').config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./SRC/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./SRC/functions/${folder}`)
    .filter(file => file.endsWith(".js"));
    for (const file of functionFiles) 
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => {
await connect(databaseToken).catch(console.error); 
})();
client.handleReactionRoles();
