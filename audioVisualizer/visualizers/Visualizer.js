export default class Visualizer {
    constructor(container, audioAnalyser) {
        this.playing = true;
        this.container = container;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.audioAnalyser = audioAnalyser;
        this.initCanvas();
        this.init();
    }

    initCanvas() {}

    play() {
        if (this.playing) {
            requestAnimationFrame(() => {
                this.play();
            });
        }
        this.draw();
    }

    stop() {
        this.playing = false;
    }

    init() {}

    draw() {}
  }