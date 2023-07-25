import Visualizer from "./Visualizer.js";

export default class Visualizer2d extends Visualizer{
    initCanvas() {
        const canvasElement = document.createElement('canvas');
        canvasElement.width  = this.width;
        canvasElement.height = this.height;
        this.canvas = canvasElement.getContext("2d");
        this.container.replaceChildren(canvasElement);
    }
  }