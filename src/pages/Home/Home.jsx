import "./Home.css";
import { Link } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import Search from "../../components/Search/Search";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <div className="header__left">
          <Link to="/">About</Link>
          <Link to="/">Features</Link>
        </div>
        <nav className="header__right">
          <a
            href="https://github.com/saraswathi22-mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://saraswathi-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
          <LightModeIcon />
        </nav>
      </header>

      <main className="body">
        <img
          src="/scout-brand1.png"
          alt="Scout logo"
          width={340}
          height={340}
        />
        <Search hideButtons={false} />
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2026 Scout</p>
      </footer>
    </div>
  );
}

export default Home;
