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
                        <img src="images/home_game_icon.svg" alt=" " className="w-48 lg:w-72 my-20"/>
                        <article className="flex flex-col space-y-12">
                            <section className="text-4xl md:text-5xl lg:text-6xl">
                                <span className="font-bold">View </span>
                                <span className="font-light">our Fornite
                                    <span className="text-yellow-400"> recordings</span>
                                </span>
                            </section>
                        </article>
                    </section>

                    <section className="flex justify-between md:mx-16 mx-4 mb-6">
                        { featuredItems?.map(item => <VideoItem metadata={item}/>) }
                    </section>
                </main>
            </SearchProvider>
        </div>
    )
}


export async function getServerSideProps() {
    return {
        props: {
            featuredItems: [{
                name: "Fornite 2022-05-12",
                poster: "https://picsum.photos/500?blur=8&id=0",
                id: 0
            }, {
                name: "Fornite 2022-05-02",
                poster: "https://picsum.photos/500?blur=8&id=1",
                id: 1
            }, {
                name: "Fornite 2022-05-08",
                poster: "https://picsum.photos/500?blur=8&id=2",
                id: 2
            }]
        }
    };
};