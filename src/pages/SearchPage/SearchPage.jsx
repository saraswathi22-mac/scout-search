import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import "./SearchPage.css";
import { useStateValue } from "../../context/StateProvider";
import { useGoogleSearch } from "../../services/useGoogleSearch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../../components/DropDown/Dropdown";
import {
  searchPageMore,
  searchPageOptionsLeft,
  searchPageOptionsRight,
} from "../../constants";
import SiteInfo from "../../components/SiteInfo/SiteInfo";
import { getFavicon } from "../../utils/getFavicon";
import { useDebounce } from "../../hooks/useDebounce";
import ResultSkeleton from "../../components/ResultSkeleton/ResultSkeleton";

function SearchPage() {
  const { term } = useStateValue();
  const debouncedTerm = useDebounce(term?.term, 500);
  const { data } = useGoogleSearch(debouncedTerm);

  const [show, setShow] = useState(false);
  const [activeLabel, setActiveLabel] = useState("All");
  const [loading, setLoading] = useState(true);

  const highlightText = (text, keyword) => {
    if (!text || !keyword) return text;

    const words = keyword.trim().split(/\s+/);

    const escapedWords = words.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

    return text.split(regex).map((part, index) =>
      escapedWords.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      ) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    setLoading(true);
  }, [debouncedTerm]);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  useEffect(() => {
    const closeDropdown = () => setShow(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="searchPage">
      {/* 🔹 Header */}
      <header className="sP_header">
        <Link to="/">
          <img
            className="sP_logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
          />
        </Link>

        <div className="sP_headerBody">
          <Search hideButtons inputValue={term?.term} />

          <nav className="sP_options">
            <div className="sP_optionsLeft">
              {searchPageOptionsLeft.map((label, idx) => (
                <div
                  className={`sP_option ${activeLabel === label ? "active" : ""
                    }`}
                  key={idx}
                  onClick={() => setActiveLabel(label)}
                >
                  <Link
                    to={label === "All" ? "/search" : `/${label.toLowerCase()}`}
                  >
                    {label}
                  </Link>
                </div>
              ))}

              <div className="sP_option_dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShow(!show);
                  }}
                  className="sP_option_dropdown_btn"
                >
                  <MoreVertIcon className="moreVertIcon" />
                  <div>More</div>
                </button>

                {show && <Dropdown show={show} items={searchPageMore} />}
              </div>
            </div>

            <div className="sP_optionsRight">
              {searchPageOptionsRight.map((label, idx) => (
                <div className="sP_option" key={idx}>
                  <Link to={`/${label.toLowerCase()}`}>{label}</Link>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 🔹 Results */}
      {term?.term && (
        <div className="results">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <ResultSkeleton key={i} />
              ))}
            </>
          ) : data?.items?.length ? (
            <>
              <p className="resultsInfo">
                About {data?.searchInformation?.formattedTotalResults} results (
                {data?.searchInformation?.formattedSearchTime} seconds)
              </p>

              {data.items.map((item) => (
                <div className="resultRow" key={item.link}>
                  {/* 🔹 Text Section */}
                  <div className="result">
                    <SiteInfo url={item.link} />

                    <div className="resultContent">
                      <a
                        className="resultTitle"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {highlightText(item.title, debouncedTerm)}
                      </a>

                      <p className="resultSnippet">
                        {highlightText(item.snippet, debouncedTerm)}
                      </p>
                    </div>
                  </div>

                  {/* 🔹 Thumbnail */}
                  {item?.pagemap?.cse_image?.[0]?.src && (
                    <img
                      className="resultThumbnail"
                      src={item.pagemap.cse_image[0].src}
                      alt="Thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFavicon(item.link);
                      }}
                    />
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className="noResults">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;