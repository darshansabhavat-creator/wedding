export default function Footer({ t }) {
  return (
    <footer className="footer reveal">
      <div className="footer-flourish" aria-hidden="true">❦</div>
      <p className="footer-kicker">{t.regards}</p>
      <p className="footer-invite">{t.invite}</p>
      <div className="footer-divider"><i /><b>✦</b><i /></div>
      <div className="hosts">{t.hosts.map((host) => <span key={host}>{host}</span>)}</div>
      <p className="small">{t.families}</p>
    </footer>
  );
}
