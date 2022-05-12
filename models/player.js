const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    username: { type: String, required: true },
    avatar: { type: String }
});

global.Player = global.Player || mongoose.model("Player", PlayerSchema);
export default global.Player;