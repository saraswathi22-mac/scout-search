import "./Home.css";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar } from "@mui/material";
import Search from "../../components/Search/Search";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <div></div>
        <nav className="right">
          <Link to="/">Gmail</Link>
          <Link to="/">Images</Link>
          <AppsIcon aria-label="Google apps menu" />
          <Avatar alt="User profile" />
        </nav>
      </header>

      <main className="body">
        <img
          src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google logo"
        />
        <div className="search_input">
          <Search hideButtons={false} />
        </div>
      </main>
    </div>
  );
}

export default Home;
