import { useEffect, useRef, useState } from "react";

const petals = Array.from({ length: 24 }, (_, index) => index);

export default function OpeningBook({ children }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("book-open-lock");
    return () => document.body.classList.remove("book-open-lock");
  }, []);

  const startOmSound = () => {
    if (soundPlaying) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = audioRef.current || new AudioContext();
      audioRef.current = context;

      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, context.currentTime);
      master.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 1.5);
      master.connect(context.destination);

      [136.1, 204.15, 272.2].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === 1 ? "triangle" : "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = 0.3 / (index + 1);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start();
      });
      setSoundPlaying(true);
    } catch {
      setSoundPlaying(false);
    }
  };

  const openLanguage = (language) => {
    startOmSound();
    if (selected) return;
    setSelected(language);
    window.setTimeout(() => {
      localStorage.setItem("wedding-language", language);
      document.body.classList.remove("book-open-lock");
      window.location.reload();
    }, 1500);
  };

  if (!open) return children;

  return (
    <div className={`divine-opening ${selected ? `language-selected language-selected-${selected}` : ""}`}>
      <div className="flower-rain" aria-hidden="true">{petals.map((petal) => <span key={petal} style={{ "--i": petal }} />)}</div>
      <div className="flower-garland garland-top" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="divine-deity" role="img" aria-label="Lord Venkateswara blessing">
        <span className="divine-om">ॐ</span><div className="deity-aura" />
        <div className="venkateswara-frame"><img src="/img/venkateswara.webp" alt="Lord Venkateswara" onError={(event) => event.currentTarget.classList.add("deity-image-missing")} /><div className="deity-placeholder" aria-hidden="true"><span>ॐ</span></div></div>
        <p>ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ ಸ್ವಾಮಿ</p><small>Om Namo Venkatesaya</small>
      </div>
      <div className="language-books">
        <p className="language-instruction"><span>Choose your language</span><b>ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ</b></p>
        <div className="books-row">
          <button className="invitation-book english-book" onClick={() => openLanguage("en")} aria-label="Open English invitation"><span className="book-pages" /><span className="book-cover-face"><i>✦</i><strong>English</strong><small>Wedding Invitation</small><b>Open</b></span></button>
          <button className="invitation-book kannada-book" onClick={() => openLanguage("kn")} aria-label="ಕನ್ನಡ ಆಹ್ವಾನವನ್ನು ತೆರೆಯಿರಿ"><span className="book-pages" /><span className="book-cover-face"><i>✦</i><strong>ಕನ್ನಡ</strong><small>ವಿವಾಹ ಆಮಂತ್ರಣ</small><b>ತೆರೆಯಿರಿ</b></span></button>
        </div>
      </div>
      <button className={`om-toggle ${soundPlaying ? "sound-on" : ""}`} onClick={startOmSound} aria-label="Play Om ambience"><span>ॐ</span><small>{soundPlaying ? "Om Playing" : "Play Om"}</small></button>
    </div>
  );
}
