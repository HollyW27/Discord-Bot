const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('unbans a user')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('The member to unban')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
            async execute(interaction, client){
                const target = interaction.options.getUser('target');
        
                await interaction.reply(`Unbanning ${target.username}`);
                await interaction.guild.members.unban(target);
            }
};