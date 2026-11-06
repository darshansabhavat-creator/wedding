import { useState } from "react";

export default function RSVP({ t }) {
  const saved = JSON.parse(localStorage.getItem("wedding-rsvp") || "null") || {};
  const [form, setForm] = useState(saved);
  const [submitted, setSubmitted] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    localStorage.setItem("wedding-rsvp", JSON.stringify(form));
    setSubmitted(true);
  };

  return (
    <section className="section rsvp-section reveal">
      <div className="section-heading"><span>05</span><p>{t.rsvpEyebrow}</p><h2>{t.rsvpTitle}</h2></div>
      {submitted ? (
        <div className="rsvp-success"><span>✓</span><h3>{t.rsvpThanks}</h3><p>{t.rsvpSaved}</p><button className="btn" onClick={() => setSubmitted(false)}>{t.editResponse}</button></div>
      ) : (
        <form className="rsvp-form" onSubmit={submit}>
          <label><span>{t.name}</span><input name="name" value={form.name || ""} onChange={update} required autoComplete="name" placeholder={t.namePlaceholder} /></label>
          <label><span>{t.attendance}</span><select name="attendance" value={form.attendance || ""} onChange={update} required><option value="">{t.select}</option><option value="yes">{t.attending}</option><option value="no">{t.notAttending}</option></select></label>
          <label><span>{t.guestCount}</span><select name="guests" value={form.guests || "1"} onChange={update}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5+</option></select></label>
          <label className="rsvp-message"><span>{t.message}</span><textarea name="message" value={form.message || ""} onChange={update} rows="4" placeholder={t.messagePlaceholder} /></label>
          <button className="rsvp-submit" type="submit">{t.submitRsvp}<span>→</span></button>
        </form>
      )}
    </section>
  );
}
