export default function LanguageSelect({ languages, onSelect }) {
  return (
    <main className="landing">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      <div className="landing-content">
        <p className="landing-blessing">॥ श्री गजानन प्रसन्न ॥</p>
        <div className="monogram" aria-hidden="true"><span>G</span><i>&</i><span>B</span></div>
        <p className="eyebrow">Wedding Invitation · ವಿವಾಹ ಪ್ರೇಕ್ಷಣ</p>
        <h1>Groom <em>&</em> Bride</h1>
        <p className="landing-date">24 <span>·</span> 11 <span>·</span> 2026</p>
        <div className="language-question">
          <p>Choose your language</p>
          <span>ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ</span>
        </div>
        <div className="lang-grid">
          {languages.map((language, index) => (
            <button
              key={language.code}
              className="language-card"
              onClick={() => onSelect(language.code)}
              style={{ "--delay": `${index * 120}ms` }}
            >
              <strong>{language.label}</strong>
              <small>{language.nativeLabel}</small>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
