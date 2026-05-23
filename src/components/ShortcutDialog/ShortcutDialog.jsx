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
    <Dialog open={open} onClose={closeModal} fullWidth>
      <DialogTitle>
        {editId ? "Edit Shortcut" : "Add Shortcut"}

        <IconButton
          onClick={closeModal}
          style={{ float: "right" }}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={closeModal}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleShortcut}
        >
          {editId ? "Update" : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShortcutDialog;