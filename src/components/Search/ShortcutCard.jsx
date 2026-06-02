import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ShortcutCard({ item, handleEdit, handleDelete }) {
  return (
    <div className="shortcutCard">
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
  );
}

export default ShortcutCard;