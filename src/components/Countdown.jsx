import { useEffect, useState } from "react";
import { WEDDING_DATE } from "../data.js";

function diff() {
  const ms = Math.max(0, new Date(WEDDING_DATE) - new Date());
  return [
    Math.floor(ms / 864e5),
    Math.floor(ms / 36e5) % 24,
    Math.floor(ms / 6e4) % 60,
    Math.floor(ms / 1e3) % 60,
  ];
}

export default function Countdown({ t }) {
  const [values, setValues] = useState(diff);
  useEffect(() => {
    const timer = setInterval(() => setValues(diff()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="section countdown-section reveal">
      <div className="section-heading">
        <span>02</span>
        <p>{t.countdownEyebrow}</p>
        <h2>{t.countdownTitle}</h2>
      </div>
      <div className="countdown">
        {values.map((value, index) => (
          <div key={index} className="unit">
            <b>{String(value).padStart(2, "0")}</b>
            <span>{t.units[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
