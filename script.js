import AudioVisualizer from './audioVisualizer/AudioVisualizer.js';

const container = document.getElementById("visualizer");
const audioPlayer = document.getElementById("audio-player");

window.visualizer = new AudioVisualizer(container, audioPlayer);

visualizer.select('line');
