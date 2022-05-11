import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className="bg-neutral-900 min-h-screen flex justify-center items-center">
            <Head>
                <title>Fornite CMS</title>
                <meta name="description" content="Store of our fornite recordings" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <main>
                <h1 className="text-7xl text-neutral-200">Fornite
                    <span className="text-yellow-400">CMS</span>
                </h1>
            </main>
        </div>
    )
}
