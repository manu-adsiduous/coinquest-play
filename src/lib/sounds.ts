"use client";

let audioCtx: AudioContext | null = null;
let unlocked = false;

function getOrCreateCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }

  return audioCtx;
}

/** Must be called from a direct user gesture (click/touch) to unlock mobile audio */
export function unlockAudio() {
  if (unlocked) return;
  const ctx = getOrCreateCtx();
  if (!ctx) return;

  // Resume the context — required by all browsers
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  // Play a silent buffer — required by iOS Safari to fully unlock
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // ignore
  }

  unlocked = true;
}

// Auto-unlock on first user interaction anywhere on the page
if (typeof window !== "undefined") {
  const autoUnlock = () => {
    unlockAudio();
    document.removeEventListener("touchstart", autoUnlock, true);
    document.removeEventListener("touchend", autoUnlock, true);
    document.removeEventListener("click", autoUnlock, true);
  };
  document.addEventListener("touchstart", autoUnlock, true);
  document.addEventListener("touchend", autoUnlock, true);
  document.addEventListener("click", autoUnlock, true);
}

function beep(frequency: number, duration: number, wave: OscillatorType = "square", volume = 0.15) {
  const ctx = getOrCreateCtx();
  if (!ctx) return;

  // Always try to resume — state may still be transitioning
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

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
  beep(523, 0.08, "square", 0.12);
  setTimeout(() => beep(659, 0.08, "square", 0.12), 80);
  setTimeout(() => beep(784, 0.12, "square", 0.12), 160);
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
