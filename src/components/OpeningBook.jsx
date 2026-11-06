import { useEffect, useState } from "react";

const petals = Array.from({ length: 20 }, (_, index) => index);

export default function OpeningBook({ children }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(null);
  const [soundPlaying, setSoundPlaying] = useState(false);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("book-open-lock");
    const audio = document.getElementById("wedding-audio");
    if (audio) {
      audio.volume = 0.55;
      audio.play().then(() => setSoundPlaying(true)).catch(() => setSoundPlaying(false));
    }
    return () => document.body.classList.remove("book-open-lock");
  }, [open]);

  const startOmSound = async () => {
    if (soundPlaying) return;
    const audio = document.getElementById("wedding-audio");
    if (!audio) return;
    try {
      audio.volume = 0.55;
      await audio.play();
      setSoundPlaying(true);
    } catch {
      setSoundPlaying(false);
    }
  };

  const stopOmSound = () => {
    const audio = document.getElementById("wedding-audio");
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setSoundPlaying(false);
  };

  const openLanguage = (language) => {
    if (selected) return;
    void startOmSound();
    setSelected(language);

    window.setTimeout(() => {
      stopOmSound();
      localStorage.setItem("wedding-language", language);
      document.body.classList.remove("book-open-lock");
      window.dispatchEvent(new CustomEvent("wedding-language-selected", { detail: language }));
      setOpen(false);
    }, 2500);
  };

  if (!open) return children;

  const isKannada = selected === "kn";

  return (
    <div className={`divine-opening ${selected ? `is-opening language-${selected}` : ""}`}>
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
          <div className="flower-shower" aria-hidden="true">
            {Array.from({ length: 18 }, (_, petal) => (
              <span key={petal} style={{ "--i": petal, "--x": `${(petal * 37) % 100}%` }} />
            ))}
          </div>
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
