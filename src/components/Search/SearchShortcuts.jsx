import AddIcon from "@mui/icons-material/Add";
import ShortcutDialog from "../ShortcutDialog/ShortcutDialog";
import ShortcutCard from "./ShortcutCard";

function SearchShortcuts({
  open,
  openModal,
  closeModal,
  name,
  setName,
  url,
  setUrl,
  editId,
  handleShortcut,
  shortcuts,
  handleEdit,
  handleDelete,
}) {
  return (
    <>
      <div
        className="shortcutCard addShortcutCard"
        onClick={openModal}
      >
        <div className="shortcutLogo addShortcutLogo">
          <AddIcon sx={{ fontSize: 24 }} />
        </div>

        <div className="addShortcutText">
          Add Shortcut
        </div>
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
          <ShortcutCard
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default SearchShortcuts;