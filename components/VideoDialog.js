import { useState, useEffect, useRef } from "react";

import { requestSync } from "../hooks/Fetch";
import Modal from "./Modal";
import Loader from "./Loader";

const VideoPlayer = ({ poster, videoSource }) => {
    const videoElement = useRef();
    const audioElement = useRef();

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

    return (
        <video poster={poster} autoPlay controls ref={videoElement}
            className="w-full md:w-4/5 max-h-screen rounded-md bg-neutral-900">
            <source src={videoSource.video} type="video/mp4" />
            <audio autoPlay ref={audioElement}>
                <source src={videoSource.audio}/>
            </audio>
        </video>
    )
}

const VideoDialog = ({ video, start, poster, onClose }) => {
    const [videoSource, setVideoSource] = useState({ video: "", audio: "" });

    const getVideoSource = async () => {
        const result = await requestSync({ url: "/api/video?id=" + video });
        const { json: { videoStream, audioStream, youtube } } = result;
        setVideoSource({ video: videoStream, audio: audioStream, youtube });
    };

    useEffect(() => {
        if (start)
            getVideoSource();
    }, [start]);

    if (start && videoSource?.video?.length > 0) {
        return (
            <Modal onClose={() => onClose(false)} center>
                { !videoSource.youtube && <VideoPlayer poster={poster} videoSource={videoSource} /> }
                { videoSource.youtube &&
                    <iframe className="w-full md:w-4/5 h-4/5 max-h-screen rounded-md bg-neutral-900"
                        src={videoSource.video} title="YouTube video player" frameBorder="0" allowFullScreen
                        allow="accelerometer;autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                }
            </Modal>
        );
    } else return (
        <Modal onClose={() => onClose(false)} center>
            <div className="w-full md:w-4/5 h-4/5 rounded-md bg-neutral-900 flex items-center justify-center">
                <Loader/>
            </div>
        </Modal>
    )
};

export default VideoDialog;