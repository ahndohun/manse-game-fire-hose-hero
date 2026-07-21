/** Small, asset-free Web Audio score for moment-to-moment feedback. */
export class FireMissionAudio {
  private context: AudioContext | null = null;
  private waterSource: AudioBufferSourceNode | null = null;
  private waterGain: GainNode | null = null;

  arm(): void {
    try {
      this.context ??= new AudioContext();
      void this.context.resume();
    } catch {
      // Audio is enhancement-only; gameplay remains complete when unavailable.
    }
  }

  startWater(): void {
    const context = this.context;
    if (context === null || this.waterSource !== null) return;
    try {
      const length = Math.max(1, Math.floor(context.sampleRate * 1.5));
      const buffer = context.createBuffer(1, length, context.sampleRate);
      const channel = buffer.getChannelData(0);
      let value = 0;
      for (let index = 0; index < length; index += 1) {
        value = value * 0.82 + (Math.random() * 2 - 1) * 0.18;
        channel[index] = value;
      }
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      filter.type = "bandpass";
      filter.frequency.value = 1_250;
      filter.Q.value = 0.45;
      gain.gain.value = 0.035;
      source.connect(filter).connect(gain).connect(context.destination);
      source.start();
      this.waterSource = source;
      this.waterGain = gain;
    } catch {
      this.waterSource = null;
      this.waterGain = null;
    }
  }

  targetHit(combo: number): void {
    this.tone(510 + Math.min(combo, 6) * 55, 0.11, "triangle", 0.12);
    this.tone(820 + Math.min(combo, 6) * 45, 0.16, "sine", 0.07, 0.045);
  }

  waveCleared(): void {
    this.tone(440, 0.13, "square", 0.07);
    this.tone(660, 0.2, "triangle", 0.1, 0.12);
  }

  victory(): void {
    [392, 523.25, 659.25, 783.99].forEach((frequency, index) => {
      this.tone(frequency, 0.45, "triangle", 0.085, index * 0.085);
    });
  }

  failure(): void {
    this.tone(250, 0.3, "sawtooth", 0.06);
    this.tone(185, 0.42, "triangle", 0.06, 0.16);
  }

  stop(): void {
    try {
      this.waterGain?.gain.setTargetAtTime(0, this.context?.currentTime ?? 0, 0.03);
      this.waterSource?.stop((this.context?.currentTime ?? 0) + 0.15);
    } catch {
      // A source may already be stopped during overlapping restart flows.
    }
    this.waterSource = null;
    this.waterGain = null;
  }

  destroy(): void {
    this.stop();
    const context = this.context;
    this.context = null;
    if (context !== null) void context.close().catch(() => undefined);
  }

  private tone(
    frequency: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    delay = 0,
  ): void {
    const context = this.context;
    if (context === null) return;
    try {
      const startAt = context.currentTime + delay;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * 0.82), startAt + duration);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration + 0.02);
    } catch {
      // Ignore device-specific Web Audio failures.
    }
  }
}
