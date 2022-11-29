const { Client, Events } = require('discord.js');
const mongoose = require('mongoose');
const reactionroleSchema = require('../../schemas/reactionrole');

module.exports = (client) => {
    client.handleReactionRoles = async () => {
        let cheri = await reactionroleSchema.find({});
        for (const reactions of cheri){
            let guild = await client.guilds.fetch(reactions.guild)
            let role = await guild.roles.fetch(reactions.roleid)
            let reaction1 = reactions.reactionString
            let channel = await guild.channels.fetch(reactions.channel)
            let message = await channel.messages.fetch(reactions.messageid)
            registerReactionRole(reactions.messageid, reaction1, role, client);
        }   
    };
}
function registerReactionRole(messageid, reactionString, role, client){
    client.on(Events.MessageReactionAdd, async (reaction1, user) => {
        await reaction1.fetch();
        await reaction1.message.fetch();
        if(reaction1.message.id != messageid){
            return;
        }
        user = await reaction1.message.guild.members.cache.get(user.id);
            if(reaction1.emoji.name === reactionString)
            {
            user.roles.add(role);
            }
    });
    client.on(Events.MessageReactionRemove, async (reaction1, user) => {
        await reaction1.fetch();
        await reaction1.message.fetch();
        if(reaction1.message.id != messageid){
            return;
        }
        user = await reaction1.message.guild.members.cache.get(user.id);
            if(reaction1.emoji.name === reactionString)
            {
            user.roles.remove(role);
            }
        
    });
};