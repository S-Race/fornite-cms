import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findOrCreateUser = async (username) => {
    let playerRecord = await prisma.player.findUnique({ where: { username } });
    if (!playerRecord)
        playerRecord = await prisma.player.create({ data: { username } });
    return playerRecord.id;
};

const addVideo = async (req, res) => {
    const { url, name, poster, placement, kills, player, squad, mode } = req.body;

    if (!url) return res.status(400).json({ msg: "Missing video url" });
    if (!name) return res.status(400).json({ msg: "Missing video name" });
    if (!poster) return res.status(400).json({ msg: "Missing poster url" });
    if (!kills) return res.status(400).json({ msg: "Missing number of kills" });
    if (!player) return res.status(400).json({ msg: "Missing player name" });
    if (!mode) return res.status(400).json({ msg: "Missing mode" });

    let squadMembers = [];
    if (squad) {
        for (let i = 0; i < squad.length; i++)
            squadMembers.push(await findOrCreateUser(squad[i]));
    }

    let playerId = await findOrCreateUser(player);
    const uploadDate = (new Date(Date.now()));

    const video = await prisma.video.create({
        data: { url, name, poster, placement, kills, playerId, squadMembers, mode, uploadDate },
    });

    if (video)
        return res.status(201).json({ msg: `Add video "${video.name}" successfully`});
    else return res.status(500).json({ msg: "An error occurred when trying to add video" });
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            return await addVideo(req, res);
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    }
    else return res.status(405).json({ msg: "Bad Method" });
}