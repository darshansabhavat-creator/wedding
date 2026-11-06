import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ t }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  useEffect(() => { setAvailable(Boolean(audioRef.current)); }, []);
  const toggle = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) { audioRef.current.pause(); setPlaying(false); }
      else { await audioRef.current.play(); setPlaying(true); }
    } catch { setPlaying(false); }
  };
  return (
    <>
      <audio ref={audioRef} loop preload="none" onError={() => setAvailable(false)}>
        <source src="/audio/om-namo.mp3" type="audio/mpeg" />
        <source src="/audio/om%20namo.aac" type="audio/aac" />
      </audio>
      {available && <button className={`music-player ${playing ? "playing" : ""}`} onClick={toggle} aria-label={playing ? t.pauseMusic : t.playMusic}><span>{playing ? "Ⅱ" : "♪"}</span><i>{playing ? t.musicPlaying : t.playMusic}</i></button>}
    </>
  );
}
