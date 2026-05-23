import React from "react";

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

import CloseIcon from "@mui/icons-material/Close";
import AddLinkIcon from "@mui/icons-material/AddLink";

import "./ShortcutDialog.css";

function ShortcutDialog({
  open,
  closeModal,
  name,
  setName,
  url,
  setUrl,
  editId,
  handleShortcut,
}) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        className: "shortcutDialogPaper",
      }}
    >
      <DialogTitle className="shortcutDialogTitle">
        <div className="shortcutDialogHeading">
          <AddLinkIcon className="shortcutDialogIcon" />

          {editId
            ? "Edit Shortcut"
            : "Add Shortcut"}
        </div>

        <IconButton
          onClick={closeModal}
          className="shortcutDialogClose"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} marginTop={1}>
          <TextField
            variant="outlined"
            label="Shortcut Name"
            fullWidth
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="shortcutInput"
          />

          <TextField
            variant="outlined"
            label="Website URL"
            fullWidth
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            className="shortcutInput"
          />
        </Stack>
      </DialogContent>

      <DialogActions className="shortcutDialogActions">
        <Button
          onClick={closeModal}
          className="cancelBtn"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleShortcut}
          className="saveBtn"
        >
          {editId ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShortcutDialog;