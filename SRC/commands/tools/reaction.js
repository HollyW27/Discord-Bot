const{ SlashCommandBuilder, Events, ReactionUserManager, Guild } = require('discord.js');
const mongoose = require('mongoose');
const reactionroleSchema = require('../../schemas/reactionrole');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('creates a reaction role')
    .addRoleOption(option => 
        option
        .setName('role')
        .setDescription('the role that the reaction is set to')
        .setRequired(true))
    .addStringOption(option => 
        option
        .setName('reaction')
        .setDescription('sets the reaction the gives the role')
        .setRequired(true)),
    async execute(interaction, client){

        const role = interaction.options.getRole('role');
        const reaction = interaction.options.getString('reaction');
        const message = await interaction.reply({content: `To get ${role} react to this message with ${reaction}`, fetchReply: true});
        await message.react(`${reaction}`);
        client.on(Events.MessageReactionAdd,
            async (reaction1, user) => {
                await reaction1.fetch();
                if(reaction1.message.id != message.id){
                    return;
                }
                user = await reaction1.message.guild.members.cache.get(user.id);
                if(reaction1.emoji.name === `${reaction}`)
                {
                user.roles.add(role);
                }
            });
        client.on(Events.MessageReactionRemove,
            async (reaction1, user) => {
                await reaction1.fetch();
                user = await reaction1.message.guild.members.cache.get(user.id);
                if(reaction1.emoji.name === `${reaction}`)
                {
                user.roles.remove(role);
                }
            });
        let guild = interaction.guild.id;
        let reactDB = await new reactionroleSchema({
            messageid: message.id,
            roleid: role.id,
            reactionString: reaction,
            guild: guild,
            channel: message.channel.id
        });
        await reactDB.save().catch(console.error);
    }
}
