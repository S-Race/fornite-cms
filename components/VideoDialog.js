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
        const playAudio = () => audioElement?.current?.play();
        const pauseAudio = () => audioElement?.current?.pause();
        const seekAudio = () => audioElement.current.currentTime = videoElement.current.currentTime;

        const removeListeners = () => {
            if (!videoElement.current) return;
            videoElement.current.removeEventListener("play", playAudio);
            videoElement.current.removeEventListener("pause", pauseAudio);
            videoElement.current.removeEventListener("seeked", seekAudio);
        }

        if (videoElement.current) {
            removeListeners(); // remove listeners that may have existed previously before adding

            videoElement.current.addEventListener("play", playAudio);
            videoElement.current.addEventListener("pause", pauseAudio);
            videoElement.current.addEventListener("seeked", seekAudio);
        }

        return removeListeners; // clean up
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