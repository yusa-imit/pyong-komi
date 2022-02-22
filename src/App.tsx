import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import useWindowSize from "./useWindowSize";

interface formatData {
    value: number;
}

function App() {
    const [value, setValue] = useState(-1);
    const windowSize = useWindowSize();
    const [clicked, setClicked] = useState(false);
    //const [image, setImage] = useState(KOKOMI_IMAGE);
    const [src, setSrc] = useState(
        "https://raw.githubusercontent.com/yusa-imit/pyong-komi/main/src/images/kokomi_no_loop.webp"
    );
    useEffect(() => {
        async function get() {
            return await axios.get<formatData>(
                "https://api.countapi.xyz/get/kokomi.sutora.org/1e72fd45-9e3d-422a-8559-4ebf25288917"
            );
        }
        get().then((res) => {
            setValue(res.data.value);
        });
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setClicked(false);
        }, 0);
    }, [clicked]);
    return (
        <div
            className="App"
            onClick={() => {
                setClicked(true);
                setSrc(
                    "https://raw.githubusercontent.com/yusa-imit/pyong-komi/main/src/images/kokomi_no_loop.webp?a=" +
                        Math.random()
                );
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
                    height:
                        windowSize.height > windowSize.width
                            ? "auto"
                            : windowSize.height * 0.8 + "px",
                    width:
                        windowSize.height > windowSize.width
                            ? windowSize.width * 0.8 + "px"
                            : "auto",
                }}
            >
                {clicked ? (
                    <></>
                ) : (
                    <img className="kokomi" alt="kokomi" src={src}></img>
                )}
            </div>
            <div className="numbers">{"KOKOMI COUNT : " + value}</div>
        </div>
    );
}

export default App;
