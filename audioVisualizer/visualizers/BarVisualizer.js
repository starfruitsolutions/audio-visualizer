import Visualizer2d from "./Visualizer2d.js";

export default class BarVisualizer extends Visualizer2d {
    init() {
        this.config = {
        animation: {
            duration: 700,
            startTime: Date.now(),
        },
        particles: {
            count: 200,
            minSize: 1,
            maxSize: 4,
            minSpeed: 0.02,
            maxSpeed: 0.06,
            minAlpha: 0.1,
            maxAlpha: 0.4,
            array: [],
        },
        };

        //populate the particle array
        for (let i = 0; i < this.config.particles.count; i++) {
        this.config.particles.array.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size:
            Math.random() *
                (this.config.particles.maxSize - this.config.particles.minSize) +
            this.config.particles.minSize,
            speed:
            Math.random() *
                (this.config.particles.maxSpeed - this.config.particles.minSpeed) +
            this.config.particles.minSpeed,
            alpha:
            Math.random() *
                (this.config.particles.maxAlpha - this.config.particles.minAlpha) +
            this.config.particles.minAlpha,
        });
        }
    }

    draw() {

        const canvas = this.canvas;
        const particles = this.config.particles;
        const animation = this.config.animation;
        const audioData = this.audioAnalyser.getFrequencyData();

        // Clear the canvas
        canvas.clearRect(0, 0, this.width, this.height);

        // Set the visualization style
        canvas.fillStyle = "rgb(11, 5, 44)";
        canvas.fillRect(0, 0, this.width, this.height);

        // Draw the particles
        for (let i = 0; i < particles.count; i++) {
        const particle = particles.array[i];

        // Update particle position
        particle.x += Math.cos(i) * particle.speed;
        particle.y += Math.sin(i) * particle.speed;

        // Wrap particle around the canvas edges
        if (particle.x > this.width) {
            particle.x = 0;
        } else if (particle.x < 0) {
            particle.x = this.width;
        }
        if (particle.y > this.height) {
            particle.y = 0;
        } else if (particle.y < 0) {
            particle.y = this.height;
        }

        // Draw particle
        canvas.fillStyle = `rgba(50, ${255 * Math.cos(i)}, ${
            255 * Math.sin(i)
        }, ${particle.alpha})`;
        canvas.beginPath();
        canvas.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        canvas.closePath();
        canvas.fill();
        }

        // Set the bar width and spacing
        const barWidth = this.width / this.audioAnalyser.slices;
        const barSpacing = 5;

        // Draw the audio visualization bars
        const currentTime = Date.now() - animation.startTime;
        const progress = (currentTime % animation.duration) / animation.duration;
        const positionOffset =
        -Math.abs((progress % 2) - 1) * (barWidth + barSpacing);

        let x = -(barWidth + barSpacing) * 4;
        for (let i = 0; i < this.audioAnalyser.slices; i++) {
        // Calculate the color using a gradient
        const gradient = canvas.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(0.5, "cyan");
        gradient.addColorStop(1, "green");
        canvas.fillStyle = gradient;

        const barHeight = (audioData[i] / 255) * this.height;
        const y = (this.height - barHeight) / 2;
        const mirroredX = this.width - x - barWidth;

        // Draw the bar on the left side
        canvas.fillRect(x - positionOffset, y, barWidth - barSpacing, barHeight);

        // Draw the mirrored bar on the right side
        canvas.fillRect(
            mirroredX + positionOffset,
            y,
            barWidth - barSpacing,
            barHeight
        );

        x += barWidth + barSpacing;
        }
    }
}
