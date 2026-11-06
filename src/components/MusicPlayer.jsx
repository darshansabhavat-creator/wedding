import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ t }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    const audio = document.getElementById("wedding-audio");
    if (!audio) {
      setAvailable(false);
      return;
    }
    audioRef.current = audio;
    setAvailable(!audio.error);
    setPlaying(!audio.paused);
    const syncPlayback = () => setPlaying(!audio.paused);
    const handleError = () => setAvailable(false);
    audio.addEventListener("play", syncPlayback);
    audio.addEventListener("pause", syncPlayback);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("play", syncPlayback);
      audio.removeEventListener("pause", syncPlayback);
      audio.removeEventListener("error", handleError);
    };
  }, []);
  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) { audioRef.current.pause(); setPlaying(false); }
      else { await audioRef.current.play(); setPlaying(true); }
    } catch { setPlaying(false); }
  };
  return (
    <>
      {available && <button className={`music-player ${playing ? "playing" : ""}`} onClick={toggle} aria-label={playing ? t.pauseMusic : t.playMusic}><span>{playing ? "Ⅱ" : "♪"}</span><i>{playing ? t.musicPlaying : t.playMusic}</i></button>}
    </>
  );
}
