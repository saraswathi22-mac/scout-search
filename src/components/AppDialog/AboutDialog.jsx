import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AppDialog from "../AppDialog/AppDialog";
import "./AboutDialog.css";

function AboutDialog({ open, onClose }) {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="About Scout"
      icon={<InfoOutlinedIcon />}
      maxWidth="xs"
    >
      <p>
        Scout is a modern search experience built with React,
        focused on speed, simplicity and discoverability.
      </p>

      <p>
        It combines a clean interface with thoughtful interactions,
        making it easy to find information without distractions.
      </p>
    </AppDialog>
  );
}

export default AboutDialog;