const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('times out a user')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('The member to timeout')
        .setRequired(true))
    .addIntegerOption(option =>
        option
        .setName('time')
        .setDescription('how long you are timing out')
        .setMinValue(1)
        .setRequired(true))
    .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('the reason for timeout'))

    .setDefaultMemberPermissions(PermissionFlagsBits.TimeoutMembers)
    .setDMPermission(false),
            async execute(interaction, client){
                const target = interaction.options.getMember('target');
                const time = interaction.options.getInteger('time');
                const reason = interaction.options.getString('reason') ?? 'No reason provided';

                await interaction.reply(`Timing out ${target.username} for ${time} seconds for reason: ${reason}`);
                await target.timeout(time*1000);
            }
};