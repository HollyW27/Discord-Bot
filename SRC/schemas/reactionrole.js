const { Schema, model} = require('mongoose');
const reactionroleSchema = new Schema({
    messageid: String,
    roleid: String,
    reactionString: String,
    guild: String,
    channel: String
});

module.exports = model("reactionrole", reactionroleSchema, "reactions");
