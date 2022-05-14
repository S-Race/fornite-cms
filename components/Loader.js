import { useEffect, useRef } from "react";

import styles from "../styles/Loader.module.css";

const Loader = ({ text }) => {
    const container = useRef();

    useEffect(() => {
        container.current.style.setProperty("--bg-color-init", "rgb(250, 204, 21)");
        container.current.style.setProperty("--bg-color-end", "rgb(234, 179, 8)");
        let dots = Array.from(container.current.lastChild.childNodes);
        let secs = 0;
        dots.forEach(dot => {
            dot.style.animationDelay = secs + "s";
            secs += 0.2;
        });
    }, []);

    return (
        <div className={styles.loader} ref={container}>
            <span className="font-semibold text-3xl mb-12 inline-block">{text}</span>
            <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
            </div>
        </div>
    );
};

export default Loader;