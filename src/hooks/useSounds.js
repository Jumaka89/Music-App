import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import crash from "assets/sounds/crash.wav";
import hh from "assets/sounds/hh.wav";
import loop from "assets/sounds/loop.wav";
import tom1 from "assets/sounds/tom1.wav";

export default function useSounds(){
    const mySampler = useRef(null);

    const [isCrashPlayed, isCrashPlayedChange] = useState(false);
    const [isHHPlayed, isHHPlayedChange] = useState(false);
    const [isLoopPlayed, isLoopPlayedChange] = useState(false);
    const [isTom1Played, isTom1PlayedChange] = useState(false);

    useEffect(()=>{
        const sampler = new Tone.Sampler({
            "C4": crash,
            "D#4": hh,
            "F#4": loop,
            "A4": tom1,
        }).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        })
    },[]);

    function soundPlay(note) {
        mySampler.current.triggerAttackRelease([note], 4);
    }

    function handleKeyDown({key}){
        switch(key){
            case "a":
                isCrashPlayedChange(true);
                window.setTimeout(()=>isCrashPlayedChange(false), 300);
                soundPlay("C4");
                break;
            case "z":
                isHHPlayedChange(true);
                window.setTimeout(()=>isHHPlayedChange(false), 300);
                soundPlay("D#4");
                break;
            case "e":
                isLoopPlayedChange(true);
                window.setTimeout(()=>isLoopPlayedChange(false), 300);
                soundPlay("F#4");
                break;
            case "r":
                isTom1PlayedChange(true);
                window.setTimeout(()=>isTom1PlayedChange(false), 300);
                soundPlay("A4");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return ()=> {
            window.removeEventListener("keydown", handleKeyDown);   
        }
    }, []);

    function handleSampleChange(note, file){
        let fileURL = URL.createObjectURL(file);
        let buffer = new Tone.Buffer(fileURL);
        mySampler.current.add(note, buffer, ()=>alert("Sample successfully changed"));
    }

    const buttonsList = [
        {
            soundPlay: ()=> soundPlay("C4"),
            isPlayed: isCrashPlayed,
            id: "crash",
            handleSampleChange: (e) => handleSampleChange("C4", e.target.files[0]),
        },
        {
            soundPlay: ()=> soundPlay("D#4"),
            isPlayed: isHHPlayed,
            id: "hh",
            handleSampleChange: (e) => handleSampleChange("D#4", e.target.files[0]),
        },
        {
            soundPlay: ()=> soundPlay("F#4"),
            isPlayed: isLoopPlayed,
            id: "loop",
            handleSampleChange: (e) => handleSampleChange("F#4", e.target.files[0]),
        },
        {
            soundPlay: ()=> soundPlay("A4"),
            isPlayed: isTom1Played,
            id: "tom1",
            handleSampleChange: (e) => handleSampleChange("A4", e.target.files[0]),
        },
    ];
    
    return {buttonsList};
}