export default class Audioanalyser {
    constructor(element, slices = 128) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = context.createAnalyser();
      analyser.fftSize = slices * 2;

      // when the audio element starts playing, resume the audio context
      element.addEventListener("play", () => {
        context.resume();
      });

      // Connect the audio route: source -> analyser and destination
      const source = context.createMediaElementSource(element);
      source.connect(analyser);
      source.connect(context.destination);

      // Create an array to store the audio data
      this.analyser = analyser;
      this.slices = slices;
      this.byteArray = new Uint8Array(slices);
    }

    getFrequencyData() {
      this.analyser.getByteFrequencyData(this.byteArray);
      return this.byteArray;
    }

    getWaveformData() {
      this.analyser.getByteTimeDomainData(this.byteArray);
      return this.byteArray;
    }
  }