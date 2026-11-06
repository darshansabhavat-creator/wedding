import { WEDDING_DATE } from "../data.js";

const calendarDate = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
const escapeIcsText = (value) => String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export default function WeddingActions({ t }) {
  const start = new Date(WEDDING_DATE);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const eventTitle = `${t.groom.name} & ${t.bride.name} Wedding`;
  const location = t.events[1]?.venue || "";
  const calendarDates = `${calendarDate(start)}/${calendarDate(end)}`;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${calendarDates}&details=${encodeURIComponent(t.invite)}&location=${encodeURIComponent(location)}`;

  const downloadCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
      `DTSTART:${calendarDate(start)}`, `DTEND:${calendarDate(end)}`,
      `SUMMARY:${escapeIcsText(eventTitle)}`,
      `DESCRIPTION:${escapeIcsText(t.invite)}`,
      `LOCATION:${escapeIcsText(location)}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding.ics";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const share = async () => {
    const shareData = { title: `${t.groom.name} & ${t.bride.name}`, text: t.invite, url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
      return;
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareData.text}\n\n${shareData.url}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section wedding-actions reveal">
      <a className="action-card" href={calendarUrl} target="_blank" rel="noreferrer"><span>◷</span><div><small>{t.addToCalendar}</small><strong>{t.googleCalendar}</strong></div></a>
      <button className="action-card" onClick={downloadCalendar}><span>↓</span><div><small>{t.download}</small><strong>{t.calendarFile}</strong></div></button>
      <button className="action-card" onClick={share}><span>↗</span><div><small>{t.shareInvite}</small><strong>{t.share}</strong></div></button>
    </section>
  );
}
