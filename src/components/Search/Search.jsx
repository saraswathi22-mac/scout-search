import React, { useState } from "react";
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

function Search({ hideButtons, inputValue }) {
  const { term, dispatch } = useStateValue();
  const [input, setInput] = useState("");
  const [termInput, setTermInput] = useState(inputValue);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: !inputValue ? input : termInput,
    });
    navigate("/search");
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <div className="search_data">
        <SearchIcon className="searchIcon" />
        {!inputValue ? (
          <input value={input} onChange={(e) => setInput(e.target.value)} />
        ) : (
          <input
            value={termInput}
            onChange={(e) => setTermInput(e.target.value)}
          />
        )}
        <MicIcon />
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
