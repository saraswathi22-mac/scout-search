import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../reducer/reducer";
import AddIcon from "@mui/icons-material/Add";
import useVoiceSearch from "../../hooks/useVoiceSearch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShortcutDialog from "../ShortcutDialog/ShortcutDialog";

function Search({ hideButtons, inputValue }) {
  const { term, dispatch } = useStateValue();
  const [input, setInput] = useState(inputValue || "");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [shortcuts, setShortcuts] = useState([]);
  const [editId, setEditId] = useState(null);

  const searchRef = useRef(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const { transcript, isListening, startListening } = useVoiceSearch();

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }

    const savedShortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];

    setShortcuts(savedShortcuts);
  }, [transcript]);

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

  const handleShortcut = () => {
    if (!name.trim() || !url.trim()) return;

    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;

    let updatedShortcuts;

    if (editId) {
      updatedShortcuts = shortcuts.map((item) =>
        item.id === editId
          ? {
              ...item,
              name,
              url: formattedUrl,
            }
          : item
      );
    } else {
      updatedShortcuts = [
        ...shortcuts,
        {
          id: Date.now(),
          name,
          url: formattedUrl,
        },
      ];
    }

    setShortcuts(updatedShortcuts);

    localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));

    setName("");
    setUrl("");
    setEditId(null);

    closeModal();
  };

  const handleDelete = (id) => {
    const filteredShortcuts = shortcuts.filter((item) => item.id !== id);

    setShortcuts(filteredShortcuts);

    localStorage.setItem("shortcuts", JSON.stringify(filteredShortcuts));
  };

  const handleEdit = (item) => {
    setName(item.name);
    setUrl(item.url);
    setEditId(item.id);

    openModal();
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <div className="search_wrapper" ref={searchRef}>
        <div className="search_data">
          <SearchIcon className="searchIcon" />
          <input
            value={input}
            onChange={(e) => handleSuggestions(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <MicIcon
            onClick={startListening}
            className={`micIcon ${isListening ? "listening" : ""}`}
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((item, index) => (
              <div
                key={item}
                className={`suggestionItem ${
                  selectedIndex === index ? "activeSuggestion" : ""
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  setInput(item);
                  setShowSuggestions(false);
                  setSelectedIndex(-1);
                }}
              >
                <SearchIcon className="suggestionIcon" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {!hideButtons ? (
        <div className="buttons shortcuts">
          <div className="shortcutCard addShortcutCard" onClick={openModal}>
            <div className="shortcutLogo addShortcutLogo">
              <AddIcon sx={{ fontSize: 24 }} />
            </div>

            <div className="addShortcutText">Add Shortcut</div>
          </div>
          <ShortcutDialog
            open={open}
            closeModal={closeModal}
            name={name}
            setName={setName}
            url={url}
            setUrl={setUrl}
            editId={editId}
            handleShortcut={handleShortcut}
          />
          <div className="shortcutsContainer">
            {shortcuts.map((item) => (
              <div key={item.id} className="shortcutCard">
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>

                <div className="shortcutActions">
                  <IconButton
                    size="small"
                    className="editBtn"
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    className="deleteBtn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default Search;
