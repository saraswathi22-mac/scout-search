import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./AppDialog.css";

function AppDialog({ open, onClose, title, icon, children, maxWidth = "sm" }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{
        className: "appDialogPaper",
      }}
    >
      <DialogTitle className="appDialogTitle">
        <div className="appDialogHeading">
          {icon && icon}
          <h2>{title}</h2>
        </div>

        <IconButton
          onClick={onClose}
          className="appDialogClose"
          aria-label="Close dialog"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="appDialogContent">{children}</DialogContent>
    </Dialog>
  );
}

export default AppDialog;
