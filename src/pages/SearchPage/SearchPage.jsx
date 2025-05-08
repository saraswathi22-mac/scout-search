import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import "./SearchPage.css";
import { useStateValue } from "../../context/StateProvider";
import { useGoogleSearch } from "../../services/useGoogleSearch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dropdown from "../../components/DropDown/Dropdown";

function SearchPage() {
  const { term, dispatch } = useStateValue();
  const { data } = useGoogleSearch(term["term"]);
  const [show, setShow] = useState(false);

  return (
    <div className="searchPage">
      <div className="sP_header">
        <Link to="/">
          <img
            className="sP_logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="sP_headerBody">
          <Search hideButtons={true} inputValue={term["term"]} />
          <div className="sP_options">
            <div className="sP_optionsLeft">
              <div className="sP_option">
                <Link to="/search" className="active">
                  All
                </Link>
              </div>
              <div className="sP_option">
                <Link to="/images">Images</Link>
              </div>
              <div className="sP_option">
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="sP_option">
                <Link to="/maps">Videos</Link>
              </div>
              <div className="sP_option">
                <Link to="/news">News</Link>
              </div>
              <div className="sP_option_dropdown">
                <button
                  onClick={() => setShow(!show)}
                  className="sP_option_dropdown_btn"
                >
                  <MoreVertIcon className="moreVertIcon" />
                  <div>More</div>
                </button>
                {show ? <Dropdown show={show} /> : " "}
              </div>
            </div>
            <div className="sP_optionsRight">
              <div className="sP_option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term["term"] && (
        <div className="results">
          <p className="resultsCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds)
          </p>
          {data?.items.map((item) => (
            <div className="result" key={item.link}>
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="resultImage"
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                    />
                  )}

                {item.link}
              </a>
              <a className="resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
