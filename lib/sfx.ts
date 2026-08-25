let audioContext: AudioContext | null = null;
let muted = false;

function getContext(): AudioContext | null {
	if (typeof window === 'undefined') return null;
	const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
	if (!Ctor) return null;
	if (!audioContext) audioContext = new Ctor();
	if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
	return audioContext;
}

export function setSfxMuted(value: boolean) {
	muted = value;
}

export function isSfxMuted() {
	return muted;
}

function noiseBuffer(ctx: AudioContext, durationSeconds: number) {
	const length = Math.floor(ctx.sampleRate * durationSeconds);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i += 1) {
		data[i] = Math.random() * 2 - 1;
	}
	return buffer;
}

export function playHitSound() {
	if (muted) return;
	const ctx = getContext();
	if (!ctx) return;
	const now = ctx.currentTime;

	const noise = ctx.createBufferSource();
	noise.buffer = noiseBuffer(ctx, 0.18);
	const bandpass = ctx.createBiquadFilter();
	bandpass.type = 'bandpass';
	bandpass.frequency.value = 2200;
	bandpass.Q.value = 0.9;
	const noiseGain = ctx.createGain();
	noiseGain.gain.setValueAtTime(0.0001, now);
	noiseGain.gain.exponentialRampToValueAtTime(0.9, now + 0.008);
	noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
	noise.connect(bandpass);
	bandpass.connect(noiseGain);
	noiseGain.connect(ctx.destination);
	noise.start(now);
	noise.stop(now + 0.18);

	const thump = ctx.createOscillator();
	thump.type = 'triangle';
	thump.frequency.setValueAtTime(180, now);
	thump.frequency.exponentialRampToValueAtTime(60, now + 0.12);
	const thumpGain = ctx.createGain();
	thumpGain.gain.setValueAtTime(0.5, now);
	thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
	thump.connect(thumpGain);
	thumpGain.connect(ctx.destination);
	thump.start(now);
	thump.stop(now + 0.14);
}

export function playMissSound() {
	if (muted) return;
	const ctx = getContext();
	if (!ctx) return;
	const now = ctx.currentTime;

	const osc = ctx.createOscillator();
	osc.type = 'sine';
	osc.frequency.setValueAtTime(700, now);
	osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);
	const gain = ctx.createGain();
	gain.gain.setValueAtTime(0.001, now);
	gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
	gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(now);
	osc.stop(now + 0.18);
}
