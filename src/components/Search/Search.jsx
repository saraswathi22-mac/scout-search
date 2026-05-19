import React, { useState, useEffect } from "react";
import "./Search.css";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../reducer/reducer";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import useVoiceSearch from "../../hooks/useVoiceSearch";

function Search({ hideButtons, inputValue }) {
  const { term, dispatch } = useStateValue();
  const [input, setInput] = useState(inputValue || "");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const {
    transcript,
    isListening,
    startListening,
  } = useVoiceSearch();

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSuggestions = (value) => {
    setInput(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = recentSearches.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setSelectedIndex(-1);
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

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedSearches)
    );

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: trimmedInput || inputValue,
    });
    navigate("/search");
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <div className="search_wrapper">
        <div className="search_data">
          <SearchIcon className="searchIcon" />
          <input
            value={input}
            onChange={(e) => handleSuggestions(e.target.value)}
          />
          <MicIcon
            onClick={startListening}
            className={`micIcon ${isListening ? "listening" : ""}`}
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((item) => (
              <div
                key={item}
                className="suggestionItem"
                onClick={() => {
                  setInput(item);
                  setShowSuggestions(false);
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
          <Button variant="outlined" onClick={openModal}>
            <AddIcon className="addIcon" />
            <div className="addShortcuts">Add Shortcut</div>
          </Button>
          <Dialog open={open} onClose={closeModal} fullWidth>
            <DialogTitle>
              User{" "}
              <IconButton onClick={closeModal} style={{ float: "right" }}>
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} margin={2}>
                <TextField variant="outlined" label="Name"></TextField>
                <TextField variant="outlined" label="URL"></TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} variant="outlined">
                Cancel
              </Button>
              <Button variant="contained">Done</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <Button variant="outlined" className="buttonsHidden">
          Add Shortcut
        </Button>
      )}
    </form>
  );
}

export default Search;
