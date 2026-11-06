import { useEffect, useState } from "react";

export default function Gallery({ t }) {
  const photos = [
    { src: "/img/couple.jpg", alt: t.galleryPhoto1 },
    { src: "/img/haldi.jpg", alt: t.galleryPhoto2 },
    { src: "/img/muhurat.jpg", alt: t.galleryPhoto3 },
    { src: "/img/reception.jpg", alt: t.galleryPhoto4 },
  ];
  const [selectedIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex((selectedIndex + photos.length - 1) % photos.length);
      if (event.key === "ArrowRight") setSelectedIndex((selectedIndex + 1) % photos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, photos.length]);

  return (
    <section className="section gallery-section reveal">
      <div className="section-heading"><span>06</span><p>{t.galleryEyebrow}</p><h2>{t.galleryTitle}</h2></div>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button key={photo.alt} className={`gallery-item gallery-item-${index + 1} reveal`} style={{ "--delay": `${index * 100}ms` }} onClick={() => setSelectedIndex(index)} aria-label={photo.alt}>
            <img src={photo.src} alt={photo.alt} loading="lazy" onError={(event) => event.currentTarget.parentElement?.classList.add("gallery-placeholder")} />
            <span>⌕</span>
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryTitle} onClick={() => setSelectedIndex(null)}>
          <button className="lightbox-close" aria-label={t.close} onClick={() => setSelectedIndex(null)}>×</button>
          <button className="lightbox-previous" aria-label={t.previousPhoto} onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + photos.length - 1) % photos.length); }}>‹</button>
          <img key={photos[selectedIndex].src} src={photos[selectedIndex].src} alt={photos[selectedIndex].alt} />
          <button className="lightbox-next" aria-label={t.nextPhoto} onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % photos.length); }}>›</button>
        </div>
      )}
    </section>
  );
}
