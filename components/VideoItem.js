import { useState } from "react";

import VideoDialog from "./VideoDialog";

const VideoItem = ({ metadata: { name, poster, _id, kills, placement, mode }, noLimit }) => {
    const [showVideo, setShowVideo] = useState(false);
    const MODES = ["Unknown", "Solo", "Duo", "Trio", "Squad"];

    return (
        <div title={name}
            className={"my-8 rounded-lg cursor-pointer " + (!noLimit ? "w-3/4 md:w-1/2 mx-auto lg:w-1/4": "mx-8")}
            key={_id}>
            { showVideo && <VideoDialog video={_id} start={showVideo} poster={poster} name={name}
                onClose={() => setShowVideo(false)}/> }
            <div className="relative group hover:scale-105 ease-in duration-300 overflow-x">
                <img src={poster} alt={name} className="rounded-lg h-full w-full"/>
                <div className="group-hover:flex hidden h-full bg-stone-900/75 absolute bottom-0
                    w-full rounded-lg justify-center items-center">
                        <button onClick={() => setShowVideo(true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 block hover:text-yellow-400 cursor-pointer"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                    1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                </div>
            </div>
            <div>
                <span className="text-lg block mt-2 px-2 truncate">{name}</span>
                <span className="text-sm px-2 text-neutral-400">kills: {kills}</span>
                <span className="text-sm px-2 text-neutral-400">placed: {placement}</span>
                <span className="text-sm px-2 text-neutral-400 font-semibold">{MODES[mode]}</span>
            </div>
        </div>
    );
}

export default VideoItem;