import Head from "next/head";
import { useState } from "react";

import AddVideoDialog from "../components/AddVideoDialog";

export default function Admin() {
    const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);

    const addVideo = () => setShowAddVideoDialog(true);

    const handleCloseVideoDialog = () => setShowAddVideoDialog(false);

    return (
        <div className="flex bg-stone-800 overflow-x-hidden h-screen">
            <Head>
                <title>Fornite CMS Admin</title>
                <meta name="description" content="Admin page for fornite cms" />
            </Head>
            { showAddVideoDialog && <AddVideoDialog onClose={handleCloseVideoDialog} /> }
            <aside className="bg-stone-900 w-1/2 md:w-1/4 h-full">
                <div className="mt-10 md:mt-30">
                    <button className="bg-green-400 text-neutral-100 flex rounded-md p-2 space-x-2 mx-2
                        hover:bg-green-500" onClick={addVideo}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-neutral-100" fill="none"
                            viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121
                                8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2
                                2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Add Video</span>
                    </button>
                </div>
            </aside>
        </div>
    )
};