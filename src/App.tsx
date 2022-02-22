import React, { useEffect, useState } from "react";
import "./App.css";
import countapi from "countapi-js";
import axios, { AxiosResponse } from "axios";
import KOKOMI_IMAGE from "./images/kokomi_no_loop.webp";
import useWindowSize from "./useWindowSize";

interface formatData {
    value: number;
}

function App() {
    const [value, setValue] = useState(-1);
    const windowSize = useWindowSize();
    const [clicked, setClicked] = useState(false);
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
        }, 50);
    }, [clicked]);
    return (
        <div
            className="App"
            onClick={() => {
                setClicked(true);
                axios.get<formatData>("https://api.countapi.xyz/hit/kokomi.sutora.org/1e72fd45-9e3d-422a-8559-4ebf25288917")
                .then((res)=>{
                    setValue(res.data.value);
                })
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
                    <img
                        className="kokomi"
                        alt="kokomi"
                        src={KOKOMI_IMAGE}
                    ></img>
                )}
            </div>
            <div className="numbers">{"KOKOMI COUNT : " + value}</div>
        </div>
    );
}

export default App;
