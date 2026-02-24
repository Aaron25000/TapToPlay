export const PIANO_NOTES = {
  // Octave 4
  'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 
  'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00, 
  'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88,
  // Octave 5
  'C2': 523.25,
  'C2#': 554.37,
  'D2': 587.33, 
  'D2#': 622.25,
  'E2': 659.25
};

export const playNote = (frequency) => {
  const audioCtx = new window.AudioContext(); // May need '|| window.webkitAudioContext'

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1);
}