import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import kokomiVideo from "./images/kokomi.mp4";

interface formatData {
    value: number;
}

function App() {
    const [value, setValue] = useState(-1);
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        (async () => {
            const res = await axios.get<formatData>(
                "https://api.countapi.xyz/get/kokomi.sutora.org/1e72fd45-9e3d-422a-8559-4ebf25288917"
            );

            setValue(res.data.value);
        })();
    }, []);

    useEffect(() => {
        if (video.current) {
            video.current.play();
        }
    }, [video]);

    return (
        <div
            className="App"
            onClick={() => {
                if (video.current) {
                    video.current.currentTime = 0;
                    video.current.play();
                }

                axios
                    .get<formatData>(
                        "https://api.countapi.xyz/hit/kokomi.sutora.org/1e72fd45-9e3d-422a-8559-4ebf25288917"
                    )
                    .then((res) => {
                        setValue(res.data.value);
                    });
            }}
        >
            <div
                className="kokomi-container"
                style={{
                    height: "80%",
                    width: "80%",
                }}
            >
                <video
                    className="kokomi"
                    src={kokomiVideo}
                    ref={video}
                    autoPlay
                    playsInline
                    muted
                />
            </div>
            <div className="numbers">{"KOKOMI COUNT : " + value}</div>
        </div>
    );
}

export default App;
