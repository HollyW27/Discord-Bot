const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const{ SlashCommandBuilder } = require('discord.js');

module.exports =(client) =>{
    client.handleCommands = async()=> {
    const commandFolders = fs.readdirSync("./SRC/commands");
        const helpDetails = new Array();
    for (const folder of commandFolders){
        const commandFiles = fs
        .readdirSync(`./SRC/commands/${folder}`)
        .filter(file => file.endsWith('.js'));

        const { commands, commandArray } = client;
        for (const file of commandFiles){
            const command = require(`../../commands/${folder}/${file}`)
           commands.set(command.data.name, command);
           commandArray.push(command.data.toJSON());
           helpDetails.push(`> **/${command.data.name}**\n > ${command.data.description}\n `)
        }
    }
    help = { data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Tells you all the commands'),
    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        })

        const newMessage = `These are all of the commands\n` + helpDetails.join("");
        await interaction.editReply({
            content: newMessage
        });
    }}
    client.commands.set(help.data.name, help)
    client.commandArray.push(help.data.toJSON())

    const clientId = '1036626541687353424';
    const guildId = '1036628022033395802';
    const rest = new REST({ version: 10}).setToken(process.env.token);
    try {
       console.log("Started refreshing application (/) commands.");
       console.log(client.commandArray);
       await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
       body: client.commandArray,
        })

        console.log("Successful reloaded application(/) commands.");
    } catch (error) {
        console.error(error);
    }
    };
};