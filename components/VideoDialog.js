import { useState, useEffect, useRef } from "react";

import { requestSync } from "../hooks/Fetch";
import Modal from "./Modal";

const VideoDialog = ({ video, start, poster, onClose }) => {
    const videoElement = useRef();
    const audioElement = useRef();

    const [videoSource, setVideoSource] = useState({ video: "", audio: "" });

    const getVideoSource = async () => {
        const result = await requestSync({ url: "/api/video?id=" + video });
        const { json: { videoStream, audioStream } } = result;
        setVideoSource({ video: videoStream, audio: audioStream });
    };

    useEffect(() => {
        if (start)
            getVideoSource();
    }, [start]);

    useEffect(() => {
        // TODO also sync the seek
        if (videoElement.current) {
            videoElement.current.onplay = () => audioElement?.current?.play();
            videoElement.current.onpause = () => audioElement?.current?.pause();
        }
    }, [videoElement.current]);

    if (start && videoSource?.video?.length > 0)
        return (
            <Modal onClose={() => onClose(false)} center>
                <video poster={poster} autoPlay controls ref={videoElement}
                    className="w-full md:w-4/5 max-h-screen rounded-md bg-neutral-900">
                    <source src={videoSource.video} type="video/mp4" />
                    <audio autoPlay ref={audioElement}>
                        <source src={videoSource.audio}/>
                    </audio>
                </video>
            </Modal>
        );
};

export default VideoDialog;