import "./Home.css";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import Search from "../../components/Search/Search";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <div className="header__left">
          <Link to="/">About</Link>
          <Link to="/">Store</Link>
        </div>
        <nav className="header__right">
          <Link to="/">Gmail</Link>
          <Link to="/">Images</Link>
          <AppsIcon aria-label="Google apps menu" />
          <Avatar alt="User profile" className="header__avatar" />
        </nav>
      </header>

      <main className="body">
        <img
          src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google logo"
        />
        <Search hideButtons={false} />
      </main>

      <footer className="footer">
        <div className="footer__region">India</div>
        <div className="footer__links">
          <div className="footer__left">
            <Link to="/">Advertising</Link>
            <Link to="/">Business</Link>
            <Link to="/">How Search works</Link>
          </div>
          <div className="footer__right">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
