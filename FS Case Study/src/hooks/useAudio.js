import { useRef } from "react";

export default function useAudio() {
  const audioRef = useRef(new Audio());

  const play = (src, onEnd) => {
    audioRef.current.src = src;
    audioRef.current.play();
    audioRef.current.onended = onEnd;
  };

  return { play };
}
