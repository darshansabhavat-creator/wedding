export default function Events({ t }) {
  return (
    <section className="section events-section">
      <div className="section-heading reveal">
        <span>03</span>
        <p>{t.eventEyebrow}</p>
        <h2>{t.eventsTitle}</h2>
      </div>
      <div className="events-list">
        {t.events.map((event, index) => (
          <article
            key={`${event.title}-${index}`}
            className="event reveal"
            style={{ "--delay": `${index * 100}ms` }}
          >
            {(index === 0 || t.events[index - 1].city !== event.city) && (
              <h4 className="city">
                <span>●</span>
                {event.city}
              </h4>
            )}
            {event.image && (
              <div className="event-image-wrap">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  onError={(error) =>
                    error.currentTarget.parentElement?.classList.add(
                      "image-unavailable"
                    )
                  }
                />
              </div>
            )}
            <div className="event-body">
              <span className="event-number">0{index + 1}</span>
              <h3>{event.title}</h3>
              <div className="event-details">
                <p>
                  <small>{t.dateLabel}</small>
                  {event.date}
                </p>
                <p>
                  <small>{t.timeLabel}</small>
                  {event.time}
                </p>
                <p>
                  <small>{t.venueLabel}</small>
                  {event.venue}
                </p>
              </div>
              {event.note && <p className="note">{event.note}</p>}
              {event.map && (
                <a
                  className="map-link"
                  href={event.map}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>⌖</span>
                  {t.viewMap}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
