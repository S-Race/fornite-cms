const VideoItem = ({ metadata: { name, poster } }) => {
    return (
        <div className="w-3/4 md:w-1/2 mx-auto my-8 lg:w-1/4 rounded-lg cursor-pointer">
            <div className="h-4/5 relative group hover:scale-105 ease-in duration-300 overflow-x">
                <img src={poster} alt={name} className="rounded-lg h-full w-full"/>
                <div className="group-hover:flex hidden h-full bg-stone-900/75 absolute bottom-0
                    w-full rounded-lg justify-center items-center">
                        <button>
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
            <span className="block mt-4 px-2 truncate">{name}</span>
        </div>
    );
}

export default VideoItem;