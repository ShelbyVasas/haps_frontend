import { FaArrowRightLong } from "react-icons/fa6";
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Home(){
    const [url, setUrl] = useState("");
    const [webData, setWebData] = useState({})
    const [model, setModel] = useState(null);
    const [classification, setClassification] = useState('');

    useEffect(() => {
        async function loadModel() {
            const model = await window.tflite.loadTFLiteModel('/model.tflite');
            setModel(model);
        }
        loadModel();
    }, []);

    useEffect(()=>{
        classifyText(webData.mainContent);
    },[webData])

    const classifyText = async (text) => {
        if (!model) {
            console.log('Model not loaded yet');
            return;
        }
        const prediction = model.predict(inputTensor);

        setClassification(prediction);
        console.log(prediction);
    };

    const getWebsiteData = () => {
        axios.get(`http://127.0.0.1:8000/analyze-url/?url=${url}`)
            .then(resp => {
                // Attempt to parse JSON from the response
                try {
                    const parsedData = JSON.parse(String(resp.data.choices[0].message.content));
                    // If parsing is successful, call setWebsiteData with the parsed object
                    setWebData(parsedData);
                    console.log(parsedData);
                    return parsedData;
                } catch (error) {
                    // If JSON parsing fails, log the error
                    console.error("Error parsing JSON:", error);
                    alert("Oh No! Something went wrong, try again.")
                }
            })
            .then(resp.mainContent)
            .catch(error => console.error(error));
    };






    
    return(
        <div className="h-screen w-full flex flex-col gap-5 justify-center items-center bg-gradient-to-b from-soft-gray via-muted-blue to-pastel-purple p-5 overflow-y-scroll">

            <div className="w-full flex flex-row md:w-1/2 bg-white border p-3 rounded-full shadow-2xl">
                <input type="text" onChange={(e)=>setUrl(e.target.value)} className="w-full focus:outline-none pl-7" placeholder="Start by entering a website..."/>
                <button onClick={getWebsiteData} className="flex items-center justify-center w-10 h-10 rounded-full bg-pastel-purple hover:bg-purple-400 duration-300 ease-in-out"><FaArrowRightLong className="text-white"/></button>
            </div>
            <div className="w-full h-full md:w-1/2 p-3 rounded-xl bg-white shadow-xl">
                <h2>{webData}</h2>
                

            </div>
        </div>
    )

}