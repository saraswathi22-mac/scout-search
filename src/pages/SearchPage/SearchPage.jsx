import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import "./SearchPage.css";
import { useStateValue } from "../../context/StateProvider";
import { useSearch } from "../../hooks/useSearch";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dropdown from "../../components/DropDown/Dropdown";
import {
  searchPageMore,
  searchPageOptionsLeft,
  searchPageOptionsRight,
} from "../../constants";
import SiteInfo from "../../components/SiteInfo/SiteInfo";
import { getSiteFavicon } from "../../utils/getSiteFavicon";
import { useDebounce } from "../../hooks/useDebounce";
import ResultSkeleton from "../../components/ResultSkeleton/ResultSkeleton";

function SearchPage() {
  const { term } = useStateValue();
  const debouncedTerm = useDebounce(term?.term, 500);
  const { data, loading, error } = useSearch(debouncedTerm);

  const [show, setShow] = useState(false);
  const [activeLabel, setActiveLabel] = useState("All");
  const [showBorder, setShowBorder] = useState(false);

  const highlightText = (text, keyword) => {
    if (!text || !keyword) return text;

    const words = keyword.trim().split(/\s+/);

    const escapedWords = words.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

    return text.split(regex).map((part, index) =>
      escapedWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const closeDropdown = () => setShow(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBorder(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="searchPage">
      {/* 🔹 Header */}
      <header className={`sP_header ${showBorder ? "headerBorder" : ""}`}>
        <div className="sP_logoWrapper">
          <Link to="/">
            <img className="sP_logo" src="/scout-brand.png" alt="Scout logo" />
          </Link>
        </div>

        <div className="sP_headerBody">
          <Search showFeatures={false} inputValue={term?.term} />
        </div>
      </header>

      <div
        className={`sP_optionsWrapper ${showBorder ? "hideTabsBorder" : ""}`}
      >
        <nav className="sP_options">
          <div className="sP_optionsLeft">
            {searchPageOptionsLeft.map((label) => (
              <div
                className={`sP_option ${activeLabel === label ? "active" : ""}`}
                key={label}
                onClick={() => setActiveLabel(label)}
              >
                <Link to={label === "All" ? "/search" : ""}>{label}</Link>
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
                {show ? (
                  <ArrowDropUpIcon className="moreVertIcon" />
                ) : (
                  <ArrowDropDownIcon className="moreVertIcon" />
                )}

                <div>Discover</div>
              </button>

              {show && <Dropdown show={show} items={searchPageMore} />}
            </div>
          </div>

          {/* <div className="sP_optionsRight">
            {searchPageOptionsRight.map((label) => (
              <div className="sP_option" key={label}>
                <Link to={`/${label.toLowerCase()}`}>{label}</Link>
              </div>
            ))}
          </div> */}
        </nav>
      </div>

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
                        e.target.src = getSiteFavicon(item.link);
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
