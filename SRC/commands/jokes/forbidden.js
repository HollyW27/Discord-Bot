const{ SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('forbidden')
    .setDescription('Posts the forbidden link'),
    async execute(interaction, client){
    const message = await interaction.deferReply({
        fetchReply: true
    })

    const newMessage = `https://hollyiscute.com/`
    await interaction.editReply({
        content: newMessage
    });
    }
    
}
