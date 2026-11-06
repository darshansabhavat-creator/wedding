export default function Hero({ t }) {
  return (
    <header className="hero reveal">
      <div className="hero-frame">
        <img className="hero-image" src={t.heroImage} alt={`${t.groom.name} and ${t.bride.name}`} onError={(event) => { event.currentTarget.parentElement?.classList.add("image-unavailable"); }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-blessing">{t.blessing}</p>
          <p className="hero-eyebrow">{t.welcomeEyebrow}</p>
          <h1>{t.groom.name}<span>&</span>{t.bride.name}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <div className="hero-divider"><i /><b>✦</b><i /></div>
          <p className="hero-date">{t.dateText}</p>
          <p className="hero-time">{t.timeText}</p>
        </div>
      </div>
    </header>
  );
}
