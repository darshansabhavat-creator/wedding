import { useEffect, useRef, useState } from "react";

const petals = Array.from({ length: 20 }, (_, index) => index);

export default function OpeningBook({ children }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("book-open-lock");
    return () => document.body.classList.remove("book-open-lock");
  }, [open]);

  const startOmSound = async () => {
    if (soundPlaying) return;
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = 0.55;
      await audioRef.current.play();
      setSoundPlaying(true);
    } catch {
      setSoundPlaying(false);
    }
  };

  const stopOmSound = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setSoundPlaying(false);
  };

  const openLanguage = (language) => {
    if (selected) return;
    void startOmSound();
    setSelected(language);

    window.setTimeout(() => {
      localStorage.setItem("wedding-language", language);
      document.body.classList.remove("book-open-lock");
      window.dispatchEvent(new CustomEvent("wedding-language-selected", { detail: language }));
      setOpen(false);
      stopOmSound();
    }, 2200);
  };

  if (!open) return children;

  const isKannada = selected === "kn";

  return (
    <div className={`divine-opening ${selected ? "is-opening" : ""}`}>
      <audio ref={audioRef} loop preload="none" onError={() => setSoundPlaying(false)}>
        <source src="/audio/om-namo.mp3" type="audio/mpeg" />
        <source src="/audio/om%20namo.aac" type="audio/aac" />
      </audio>
      <div className="flower-rain" aria-hidden="true">
        {petals.map((petal) => <span key={petal} style={{ "--i": petal }} />)}
      </div>
      <div className="flower-garland" aria-hidden="true">
        {Array.from({ length: 13 }, (_, index) => <i key={index} />)}
      </div>

      <div className="divine-deity" role="img" aria-label="Lord Venkateswara blessing">
        <span className="divine-om">ॐ</span>
        <div className="deity-aura" />
        <div className="venkateswara-frame">
          <img src="/img/venkateswara.webp" alt="Lord Venkateswara" onError={(event) => event.currentTarget.classList.add("deity-image-missing")} />
          <div className="deity-placeholder" aria-hidden="true"><span>ॐ</span></div>
        </div>
        <div className="deity-caption"><strong>ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ ಸ್ವಾಮಿ</strong><small>Om Namo Venkatesaya</small></div>
      </div>

      <div className="language-books">
        <p className="language-instruction"><span>Choose your language</span><b>ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ</b></p>
        <div className="books-row">
          <button type="button" className="invitation-book english-book" onClick={() => openLanguage("en")} aria-label="Open English wedding invitation">
            <span className="book-back" /><span className="book-pages" /><span className="book-cover-face"><i>✦</i><strong>English</strong><small>Wedding Invitation</small><b>Open Book</b></span>
          </button>
          <button type="button" className="invitation-book kannada-book" onClick={() => openLanguage("kn")} aria-label="ಕನ್ನಡ ವಿವಾಹ ಆಹ್ವಾನವನ್ನು ತೆರೆಯಿರಿ">
            <span className="book-back" /><span className="book-pages" /><span className="book-cover-face"><i>✦</i><strong>ಕನ್ನಡ</strong><small>ವಿವಾಹ ಆಮಂತ್ರಣ</small><b>ತೆರೆಯಿರಿ</b></span>
          </button>
        </div>
      </div>

      <button type="button" className={`om-toggle ${soundPlaying ? "sound-on" : ""}`} onClick={soundPlaying ? stopOmSound : startOmSound} aria-label={soundPlaying ? "Stop Om ambience" : "Play Om ambience"}>
        <span>ॐ</span><small>{soundPlaying ? "Om Playing" : "Play Om"}</small>
      </button>

      {selected && (
        <div className="opening-book-stage" aria-hidden="false">
          <div className="full-book-spine" />
          <div className="full-book-page full-book-left">
            <div className="page-border" />
            <span className="page-monogram">{isKannada ? "ಮಂ" : "G"}</span>
            <div className="page-ornament">❦</div>
          </div>
          <div className="full-book-page full-book-right">
            <div className="page-border" />
            <span className="page-monogram">{isKannada ? "ವ" : "B"}</span>
            <p>{isKannada ? "ಮಂಗಳ ವಿವಾಹ" : "Wedding Celebration"}</p>
            <strong>{isKannada ? "ಆಮಂತ್ರಣ" : "Invitation"}</strong>
            <div className="page-ornament">✦</div>
          </div>
          <div className="turning-cover">
            <span>{isKannada ? "ಕನ್ನಡ" : "English"}</span>
            <small>{isKannada ? "ವಿವಾಹ ಆಮಂತ್ರಣ" : "Wedding Invitation"}</small>
          </div>
        </div>
      )}
    </div>
  );
}
