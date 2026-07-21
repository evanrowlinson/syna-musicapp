import './Header.css';

const Header = ({ resetSession }) => {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1 className="header-title">SYNA</h1>
        <p className="header-tagline">Your mood. Your music. Your art.</p>
      </div>
      <button
        type="button"
        className="header-reset"
        onClick={resetSession}
        aria-label="Start a new session"
      >
        New Session
      </button>
    </header>
  );
};

export default Header;
