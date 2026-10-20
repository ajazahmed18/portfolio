export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Mohammed Ajaz Ahmed. Full Stack Developer.</p>
      <button
        className="to-top"
        id="toTop"
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </footer>
  );
}
