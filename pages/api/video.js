import { connectDB } from "../../middleware/mongodb";
import Player from "../../models/player";
import Video from "../../models/video";

const findOrCreateUser = async (username) => {
    let player = await Player.find({ username }).exec();
    if (!player || player.length < 1) {
        // create the user
        const newPlayer = new Player({ username });
        player = await newPlayer.save();
        if (player !== newPlayer)
            throw new Error("Failed to create player");
    }

    return player.id;
};

const addVideo = async (req, res) => {
    const { url, name, poster, placement, kills, player, squad, mode } = req.body;

    if (!url) return res.status(400).json({ msg: "Missing video url" });
    if (!name) return res.status(400).json({ msg: "Missing video name" });
    if (!poster) return res.status(400).json({ msg: "Missing poster url" });
    if (!kills && kills !== 0) return res.status(400).json({ msg: "Missing number of kills" });
    if (!player) return res.status(400).json({ msg: "Missing player name" });
    if (!mode) return res.status(400).json({ msg: "Missing mode" });

    let squadMembers = [];
    if (squad) {
        for (let i = 0; i < squad.length; i++)
            squadMembers.push(await findOrCreateUser(squad[i]));
    }

    let playerId = await findOrCreateUser(player);
    const uploadDate = (new Date(Date.now()));

    const video = new Video({ url, name, poster, placement, kills, playerId, squadMembers, mode, uploadDate });
    let savedVideo = video.save();

    if (savedVideo !== video)
        return res.status(201).json({ msg: `Add video "${video.name}" successfully`});
    else return res.status(500).json({ msg: "An error occurred when trying to add video" });
}

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            return await addVideo(req, res);
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    }
    else return res.status(405).json({ msg: "Bad Method" });
}

export default connectDB(handler);