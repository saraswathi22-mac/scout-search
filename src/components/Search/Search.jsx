import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import useVoiceSearch from "../../hooks/useVoiceSearch";
import { actionTypes } from "../../context/searchReducer";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

function Search({ inputValue }) {
  const { term, dispatch } = useStateValue();
  const [input, setInput] = useState(inputValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);

  const navigate = useNavigate();

  const { transcript, isListening, startListening } = useVoiceSearch();

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  useEffect(() => {
    if (!transcript) return;

    setInput(transcript);

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: transcript,
    });

    navigate("/search");
  }, [transcript, dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestions = (value) => {
    setInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    const filteredSuggestions = recentSearches.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();

      const selectedSuggestion = suggestions[selectedIndex];

      setInput(selectedSuggestion);
      setShowSuggestions(false);
      setSelectedIndex(-1);

      dispatch({
        type: actionTypes.SET_SEARCH_TERM,
        term: selectedSuggestion,
      });

      navigate("/search");
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }

    if (!suggestions.length) return;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const updatedSearches = [
      trimmedInput,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== trimmedInput.toLowerCase()
      ),
    ].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: trimmedInput || inputValue,
    });
    navigate("/search");
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <div className="search_wrapper" ref={searchRef}>
        <SearchInput
          input={input}
          handleSuggestions={handleSuggestions}
          handleKeyDown={handleKeyDown}
          startListening={startListening}
          isListening={isListening}
        />
        {showSuggestions && suggestions.length > 0 && (
          <SearchSuggestions
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setInput={setInput}
            setShowSuggestions={setShowSuggestions}
          />
        )}
      </div>
      <div className="feature-pills-container">
        <div className="feature-pill">
          <span className="pill-icon">⚡</span>
          <span className="pill-text">Fast Results</span>
        </div>
        <div className="feature-pill">
          <span className="pill-icon">🎯</span>
          <span className="pill-text">Smart Suggestions</span>
        </div>
        <div className="feature-pill">
          <span className="pill-icon">⌨️</span>
          <span className="pill-text">Keyboard Friendly</span>
        </div>
      </div>
    </form>
  );
}

export default Search;
