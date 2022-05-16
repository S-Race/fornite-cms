import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Navbar from "../../components/Navbar";
import VideoItem from "../../components/VideoItem";

import { SearchProvider } from "../../context/SearchContext";

export default function Top({ items }) {
    const router = useRouter();
    const { query: { position } } = router;

    useEffect(() => {
        if (position !== "4" && position !== "10" && position !== "25")
            router.replace("/404");
    }, []);

    return (
        <div className="flex flex-col bg-stone-800 overflow-x-hidden h-screen">
            <Head>
                <title>Fornite CMS - Top {position}</title>
                <meta name="description" content="Store of our fornite recordings" />
            </Head>
            <SearchProvider>
                <Navbar/>
                <main className="min-h-fit text-neutral-100">
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        { items?.map(item => <VideoItem metadata={item} noLimit/>) }
                    </section>
                </main>
            </SearchProvider>
        </div>
    )
}

import { createConnection } from "../../middleware/mongodb";
import Video from "../../models/video";

export async function getServerSideProps({ query: { position } }) {
    if (position !== "4" && position !== "10" && position !== "25") {
        return {
            props: { items: [] }
        }
    }

    createConnection();
    const videos = await Video
        .find({ placement: { $lt: Number(position) + 1 }})
        .populate({ path: "player", select: ["username", "avatar"] })
        .populate({ path: "squadMembers", select: ["username", "avatar"] });
    if (!videos) return { props: { items: [] } };

    const items = JSON.parse(JSON.stringify(videos));

    return {
        props: { items }
    };
};