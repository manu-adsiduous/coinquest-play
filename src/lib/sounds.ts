"use client";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function beep(frequency: number, duration: number, type: OscillatorType = "square", volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function playCorrect() {
  const ctx = getCtx();
  beep(523, 0.08, "square", 0.12); // C5
  setTimeout(() => beep(659, 0.08, "square", 0.12), 80); // E5
  setTimeout(() => beep(784, 0.12, "square", 0.12), 160); // G5
  void ctx;
}

export function playWrong() {
  beep(200, 0.15, "sawtooth", 0.1);
  setTimeout(() => beep(150, 0.2, "sawtooth", 0.1), 120);
}

export function playUnlock() {
  beep(440, 0.06, "square", 0.1);
  setTimeout(() => beep(554, 0.06, "square", 0.1), 60);
  setTimeout(() => beep(659, 0.06, "square", 0.1), 120);
  setTimeout(() => beep(880, 0.12, "square", 0.1), 180);
}

export function playComplete() {
  beep(523, 0.08, "square", 0.12);
  setTimeout(() => beep(659, 0.08, "square", 0.12), 100);
  setTimeout(() => beep(784, 0.08, "square", 0.12), 200);
  setTimeout(() => beep(1047, 0.15, "square", 0.12), 300);
}

export function playCoins() {
  beep(1200, 0.05, "square", 0.08);
  setTimeout(() => beep(1400, 0.05, "square", 0.08), 60);
  setTimeout(() => beep(1600, 0.08, "square", 0.1), 120);
}

export function playClick() {
  beep(800, 0.03, "square", 0.06);
}
