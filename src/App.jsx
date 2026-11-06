import { useEffect, useState } from "react";
import { languages, content } from "./data.js";
import LanguageSelect from "./components/LanguageSelect.jsx";
import Hero from "./components/Hero.jsx";
import Couple from "./components/Couple.jsx";
import Countdown from "./components/Countdown.jsx";
import Events from "./components/Events.jsx";
import WeddingActions from "./components/WeddingActions.jsx";
import Gallery from "./components/Gallery.jsx";
import Contacts from "./components/Contacts.jsx";
import Footer from "./components/Footer.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("wedding-language") || null);

  useEffect(() => {
    if (lang) {
      localStorage.setItem("wedding-language", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    const handleLanguageSelection = (event) => setLang(event.detail);
    window.addEventListener("wedding-language-selected", handleLanguageSelection);
    return () => window.removeEventListener("wedding-language-selected", handleLanguageSelection);
  }, []);

  if (!lang) return <LanguageSelect languages={languages} onSelect={setLang} />;

  const t = content[lang];
  const changeLanguage = () => {
    localStorage.removeItem("wedding-language");
    window.location.reload();
  };

  return (
    <>
      <MusicPlayer t={t} />
      <main className="invitation" lang={lang === "kn" ? "kn" : "en"}>
        <button className="back" onClick={changeLanguage} aria-label={t.back}>← {t.back}</button>
        <Hero t={t} />
        <Couple t={t} />
        <Countdown t={t} />
        <Events t={t} />
        <WeddingActions t={t} />
        <Gallery t={t} />
        <Contacts t={t} />
        <Footer t={t} />
      </main>
    </>
  );
}
