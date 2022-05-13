import Head from "next/head"
import styles from "../styles/Home.module.css"

import Navbar from "../components/Navbar";
import VideoItem from "../components/VideoItem";

import { SearchProvider } from "../context/SearchContext";

export default function Home({ featuredItems }) {
    return (
        <div className="flex flex-col bg-stone-800 overflow-x-hidden h-screen">
            <Head>
                <title>Fornite CMS</title>
                <meta name="description" content="Store of our fornite recordings" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <SearchProvider>
                <Navbar/>
                <main className="h-fit text-neutral-100">
                    <section className="flex flex-col-reverse items-center mt-32 w-full lg:w-fit mx-auto">
                        <img src="images/home_game_icon.svg" alt=" " className="w-40 lg:w-72 my-20"/>
                        <article className="flex flex-col space-y-12">
                            <section className="text-3xl md:text-4xl md:text-5xl lg:text-6xl">
                                <span className="font-bold">View </span>
                                <span className="font-light">our Fornite
                                    <span className="text-yellow-400"> recordings</span>
                                </span>
                            </section>
                        </article>
                    </section>

                    <section className="flex flex-col lg:flex-row md:justify-between md:mx-16 mx-4 mb-6">
                        { featuredItems?.map(item => <VideoItem metadata={item}/>) }
                    </section>
                </main>
            </SearchProvider>
        </div>
    )
}

import { createConnection } from "../middleware/mongodb";
import Video from "../models/video";

export async function getServerSideProps() {
    createConnection();
    const videos = await Video.find({ placement: { $lt: 5 }});
    if (!videos) return { props: { featuredItems: [] } };

    let candidates = videos.filter(v => v.placement === 1);
    let lt = 3;
    while(candidates.length < 3) {
        candidates = videos.filter(v => v.placement < lt)
        lt++;
        if (lt === 6) break;
    }
    const featuredItems = JSON.parse(JSON.stringify(candidates.slice(0, 3)));

    return {
        props: {
            featuredItems
        }
    };
};