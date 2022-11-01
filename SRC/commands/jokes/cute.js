const{ SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cute')
    .setDescription('Says Evelyn is cute'),
    async execute(interaction, client){
    const message = await interaction.deferReply({
        fetchReply: true
    })
    
    const newMessage = `<@${process.env.evelynid}> is cute!`
    await interaction.editReply({
        content: newMessage
    });
    }
    
}
