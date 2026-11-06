import { WEDDING_DATE } from "../data.js";

export default function WeddingActions({ t }) {
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${t.groom.name} & ${t.bride.name} Wedding`)}&dates=20261124T062800Z/20261124T102800Z&details=${encodeURIComponent(t.invite)}&location=${encodeURIComponent(t.events[1]?.venue || "")}`;

  const downloadCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
      "DTSTART:20261124T062800Z", "DTEND:20261124T102800Z",
      `SUMMARY:${t.groom.name} & ${t.bride.name} Wedding`,
      `DESCRIPTION:${t.invite}`,
      `LOCATION:${t.events[1]?.venue || ""}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
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
