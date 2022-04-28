//Imports
import MediaPlayer from "./module/MediaPlayer.js";
import AutoPlay from "../assets/plugins/AutoPlay.js";
import AutoPause from '../assets/plugins/AutoPause.js';

//Constantes de elementos
const video = document.querySelector('video');
const button = document.querySelector('button');
const bmute = document.querySelector("#bmute");

//MediaPlayer: plugins
const player = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause()] });

//Play-Pause
button.onclick = () => player.tooglePlay();

//Mute-Unmute
bmute.onclick = () => player.toogleMute();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log(err);
    })
}