import React from "react";

function Card({ person, index }) {
  return (
    <article className="couple-card reveal" style={{ "--delay": `${index * 120}ms` }}>
      <div className="couple-card-mark">{person.role === "Groom" || person.role === "ವರ" ? "✦" : "❦"}</div>
      <span className="tag">{person.role}</span>
      <h3>{person.name}</h3>
      <p className="couple-job">{person.job}</p>
      <div className="couple-rule" />
      <p>{person.parents}</p>
      <p className="couple-place">{person.place}</p>
    </article>
  );
}
export default function Couple({ t }) {
  return (
    <section className="section couple-section">
      <div className="section-heading reveal"><span>01</span><p>{t.coupleEyebrow}</p><h2>{t.coupleTitle}</h2></div>
      <div className="two-col"><Card person={t.groom} index={0} /><Card person={t.bride} index={1} /></div>
    </section>
  );
}
