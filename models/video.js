const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    name: { type: String, required: true },
    uploadDate: { type: String, required: true },
    poster: { type: String, required: true },
    placement: { type: Number, required: true },
    kills: { type: Number, required: true },
    player: { type: "ObjectId", ref: "Player", required: true },
    squadMembers: { type: [Schema.Types.ObjectId], ref: "Player" },
    mode: { type: Number, required: true },
    url: { type: String, required: true }
});

global.Video = global.Video || mongoose.model("Video", VideoSchema);
export default global.Video;