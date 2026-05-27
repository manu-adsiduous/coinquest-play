"use client";

let audioCtx: AudioContext | null = null;
let unlocked = false;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }

  // Resume on every call — browsers require this after user gesture
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

// Call this once from a click/touch handler to permanently unlock audio
export function unlockAudio() {
  if (unlocked) return;
  const ctx = ensureCtx();
  if (!ctx) return;

  // Create a silent buffer and play it — this unlocks audio on iOS/Safari
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
  unlocked = true;
}

function beep(frequency: number, duration: number, wave: OscillatorType = "square", volume = 0.15) {
  const ctx = ensureCtx();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported
  }
}

export function playCorrect() {
  unlockAudio();
  beep(523, 0.08, "square", 0.12);
  setTimeout(() => beep(659, 0.08, "square", 0.12), 80);
  setTimeout(() => beep(784, 0.12, "square", 0.12), 160);
}

export function playWrong() {
  unlockAudio();
  beep(200, 0.15, "sawtooth", 0.1);
  setTimeout(() => beep(150, 0.2, "sawtooth", 0.1), 120);
}

export function playUnlock() {
  unlockAudio();
  beep(440, 0.06, "square", 0.1);
  setTimeout(() => beep(554, 0.06, "square", 0.1), 60);
  setTimeout(() => beep(659, 0.06, "square", 0.1), 120);
  setTimeout(() => beep(880, 0.12, "square", 0.1), 180);
}

export function playComplete() {
  unlockAudio();
  beep(523, 0.08, "square", 0.12);
  setTimeout(() => beep(659, 0.08, "square", 0.12), 100);
  setTimeout(() => beep(784, 0.08, "square", 0.12), 200);
  setTimeout(() => beep(1047, 0.15, "square", 0.12), 300);
}

export function playCoins() {
  unlockAudio();
  beep(1200, 0.05, "square", 0.08);
  setTimeout(() => beep(1400, 0.05, "square", 0.08), 60);
  setTimeout(() => beep(1600, 0.08, "square", 0.1), 120);
}

export function playClick() {
  unlockAudio();
  beep(800, 0.03, "square", 0.06);
}
