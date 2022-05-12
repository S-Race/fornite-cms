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

const getVideoStream = async (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(400).json({ msg: "no video id" });
    const video = await Video.findById(id).exec();

    const { create: createYoutubeDl } = require("yt-dlp-exec");
    const ytdlp = createYoutubeDl("yt-dlp");


    let json = await ytdlp(video.url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
    });

    if (!json)
        return res.status(404).send({ stream: "" });

    let videoCandidates = json.formats.filter(format => format.protocol === "https");
    let highest = videoCandidates[0];

    if (videoCandidates.length < 1)
        return res.status(400).send({ stream: "", msg: "can't get a video url with http protocol" });

    for(let i = 1; i < videoCandidates.length; i++)
        highest = videoCandidates[i].height > highest.height ? videoCandidates[i] : highest;

    // return res.status(200).json({ formats: json.formats });
    const audioStream = json.formats.filter(format => format.protocol === "https" && format.acodec !== "none")[0];

    return res.status(200).json({ audioStream: audioStream.url, videoStream: highest.url });
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            return await addVideo(req, res);
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    }

    if (req.method === "GET") {
        try {
            return await getVideoStream(req, res);
        } catch (e) {
            return res.status(500).json({ msg: e.message, stream: "" });
        }
    }

    return res.status(405).json({ msg: "Bad Method" });
}

export default connectDB(handler);