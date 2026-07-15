import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({
  input,
  handleSuggestions,
  handleKeyDown,
  startListening,
  isListening,
  inputRef,
}) {
  return (
    <div className="search_data">
      <SearchIcon className="searchIcon" />

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleSuggestions(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Scout..."
      />
      <MicIcon
        onClick={startListening}
        className={`micIcon ${isListening ? "listening" : ""}`}
      />
    </div>
  );
}

export default SearchInput;
