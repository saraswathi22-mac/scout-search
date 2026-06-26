import SearchIcon from "@mui/icons-material/Search";

function SearchSuggestions({
  suggestions,
  selectedIndex,
  setSelectedIndex,
  onSuggestionClick,
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
          onClick={() => onSuggestionClick(item)}
        >
          <SearchIcon className="suggestionIcon" />
          {item}
        </div>
      ))}
    </div>
  );
}

export default SearchSuggestions;
