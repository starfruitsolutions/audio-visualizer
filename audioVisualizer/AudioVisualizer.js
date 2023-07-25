import Audioanalyser from './AudioAnalyzer.js';

import LineVisualizer from './visualizers/LineVisualizer.js';
import BarVisualizer from './visualizers/BarVisualizer.js';
import SphereVisualizer from './visualizers/SphereVisualizer.js';

export default class AudioVisualizer {
    constructor(container, audioElement) {
        this.container = container;
        this.audioElement = audioElement;
        this.analyser = new Audioanalyser(audioElement, 128);
        this.visualizer = new LineVisualizer(container, this.analyser);
    }

    getVisualization(type) {
        const visualizers = {
            line: () => new LineVisualizer(this.container, this.analyser),
            bar: () => new BarVisualizer(this.container, this.analyser),
            sphere: () => new SphereVisualizer(this.container, this.analyser),
        }
        return visualizers[type]();
    }

    select(type) {
        this.visualizer.stop();
        this.visualizer = this.getVisualization(type);
        this.visualizer.play();
    }
  }