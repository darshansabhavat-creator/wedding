import { useEffect, useState } from "react";

export default function Gallery({ t }) {
  const photos = [
    { src: "/img/couple-temp.svg", alt: t.galleryPhoto1 },
    { src: "/img/haldi-temp.svg", alt: t.galleryPhoto2 },
    { src: "/img/wedding-temp.svg", alt: t.galleryPhoto3 },
    { src: "/img/reception-temp.svg", alt: t.galleryPhoto4 },
  ];
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const close = (event) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <section className="section gallery-section reveal">
      <div className="section-heading"><span>06</span><p>{t.galleryEyebrow}</p><h2>{t.galleryTitle}</h2></div>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button key={photo.alt} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setSelected(photo)} aria-label={photo.alt}>
            <img src={photo.src} alt={photo.alt} loading="lazy" onError={(event) => event.currentTarget.parentElement?.classList.add("gallery-placeholder")} />
            <span>⌕</span>
          </button>
        ))}
      </div>
      {selected && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button aria-label={t.close} onClick={() => setSelected(null)}>×</button><img src={selected.src} alt={selected.alt} /></div>}
    </section>
  );
}
