const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kicks a user')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('The member to kick')
        .setRequired(true))
    .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('the reason for kicking'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
            async execute(interaction, client){
                const target = interaction.options.getUser('target');
                const reason = interaction.options.getString('reason') ?? 'No reason provided';
        
                await interaction.reply(`Kicking ${target.username} for reason: ${reason}`);
                await interaction.guild.members.kick(target);
            }
};