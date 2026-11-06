import { useState } from "react";

export default function Contacts({ t }) {
  const [done, setDone] = useState(null);
  const copy = async (phone) => {
    try {
      await navigator.clipboard.writeText(phone);
      setDone(phone);
      window.setTimeout(() => setDone(null), 1600);
    } catch {
      window.prompt(t.copy, phone);
    }
  };
  return (
    <section className="section contacts-section reveal">
      <div className="section-heading">
        <span>07</span>
        <p>{t.helpEyebrow}</p>
        <h2>{t.helpTitle}</h2>
      </div>
      <p className="section-intro">{t.helpText}</p>
      <div className="contacts-list">
        {t.contacts.map((contact) => (
          <div key={contact.phone} className="contact">
            <div className="contact-person">
              <span className="contact-avatar">{contact.name.charAt(0)}</span>
              <div>
                <strong>{contact.name}</strong>
                <small>{contact.phone}</small>
              </div>
            </div>
            <div className="contact-actions">
              <a
                className="btn call-button"
                href={`tel:+91${contact.phone}`}
              >
                <span>☎</span>
                {t.call}
              </a>
              <button
                className="btn"
                onClick={() => copy(contact.phone)}
              >
                {done === contact.phone ? t.copied : t.copy}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
