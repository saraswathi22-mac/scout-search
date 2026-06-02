import SearchIcon from "@mui/icons-material/Search";

function SearchSuggestions({
  suggestions,
  selectedIndex,
  setSelectedIndex,
  setInput,
  setShowSuggestions,
}) {
  return (
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
  );
}

export default SearchSuggestions;