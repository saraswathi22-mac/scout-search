import { useState } from "react";
import "./Home.css";
import LightModeIcon from "@mui/icons-material/LightMode";

import Search from "../../components/Search/Search";
import AboutDialog from "../../components/AppDialog/AboutDialog";
import FeaturesDialog from "../../components/AppDialog/FeatureDialog";

function Home() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);

  return (
    <div className="home">
      <header className="header">
        <div className="header__left">
          <button className="header__link" onClick={() => setOpenAbout(true)}>
            About
          </button>

          <button
            className="header__link"
            onClick={() => setOpenFeatures(true)}
          >
            Features
          </button>
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

        <Search />
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2026 Scout</p>
      </footer>

      <AboutDialog open={openAbout} onClose={() => setOpenAbout(false)} />

      <FeaturesDialog
        open={openFeatures}
        onClose={() => setOpenFeatures(false)}
      />
    </div>
  );
}

export default Home;
