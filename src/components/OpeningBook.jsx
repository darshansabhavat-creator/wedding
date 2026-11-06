import { useEffect, useState } from "react";

export default function OpeningBook({ children }) {
  const [open, setOpen] = useState(() => !sessionStorage.getItem("wedding-opening-seen"));
  const [openedPages, setOpenedPages] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("book-open-lock");
    const timer = window.setTimeout(() => setOpenedPages(true), 850);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("book-open-lock");
    };
  }, [open]);

  const finish = () => {
    sessionStorage.setItem("wedding-opening-seen", "true");
    setOpen(false);
    document.body.classList.remove("book-open-lock");
  };

  if (!open) return children;

  return (
    <>
      <div className={`opening-book ${openedPages ? "pages-open" : ""}`} role="dialog" aria-label="Opening wedding invitation">
        <div className="opening-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="book-scene">
          <div className="book-cover">
            <div className="cover-edge edge-left" />
            <div className="cover-edge edge-right" />
            <div className="cover-page cover-page-left">
              <div className="deity-frame">
                <span className="deity-om">ॐ</span>
                <img src="/img/venkateswara.webp" alt="Lord Venkateswara" onError={(event) => event.currentTarget.classList.add("deity-image-missing")} />
                <span className="deity-name">శ్రీ వెంకటేశ్వర స్వామి</span>
                <span className="deity-blessing">OM NAMO VENKATESAYA</span>
              </div>
            </div>
            <div className="cover-page cover-page-right">
              <div className="page-flourish">❦</div>
              <p>Shubha Mangala</p>
              <div className="page-om">ॐ</div>
              <span>With divine blessings</span>
            </div>
            <button className="book-open-button" onClick={finish} aria-label="Open invitation">
              <span>Open Invitation</span>
              <b>→</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
