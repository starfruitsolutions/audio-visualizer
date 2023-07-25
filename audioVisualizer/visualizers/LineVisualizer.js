import Visualizer2d from "./Visualizer2d.js";

export default class LineVisualizer extends Visualizer2d {
    init() {
        const gradient = this.canvas.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "green");

        this.canvas.strokeStyle = gradient;
        this.canvas.lineWidth = 8;
    }

    draw() {
        const canvas = this.canvas;
        const audioData = this.audioAnalyser.getWaveformData();

        // Clear the canvas
        canvas.clearRect(0, 0, this.width, this.height);
        canvas.fillStyle = "rgb(11, 5, 44)";
        canvas.fillRect(0, 0, this.width, this.height);

        // Set the width and spacing
        const spacing = this.width / this.audioAnalyser.slices;

        // Draw the lines
        canvas.beginPath();
        for (let i = 0; i < this.audioAnalyser.slices; i++) {
            // Calculate the line position
            const x = i * spacing;
            const y = (this.height / 2) * (audioData[i] / 128);

            // Draw the line
            if (i === 0) canvas.moveTo(x, y)
            canvas.lineTo(x, y);
            canvas.stroke();
        }
    }
}
