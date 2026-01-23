let audio = new Audio();

export function loadAndPlay(src) {
  if (audio.src !== window.location.origin + src) {
    audio.src = src;
  }
  audio.play().catch(() => {});
}

export function pauseAudio() {
  audio.pause();
}

export function getAudio() {
  return audio;
}
