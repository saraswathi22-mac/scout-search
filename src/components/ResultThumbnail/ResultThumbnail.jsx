import { useState } from "react";
import { getSiteFavicon } from "../../utils/getSiteFavicon";
import "./ResultThumbnail.css";

function ResultThumbnail({ item }) {
  const [imageError, setImageError] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const image =
    item?.pagemap?.cse_image?.[0]?.src ||
    item?.pagemap?.cse_thumbnail?.[0]?.src;

  if (!imageError && image) {
    return (
      <img
        className="resultThumbnail"
        src={image}
        alt={item.title}
        onError={() => setImageError(true)}
      />
    );
  }

  if (!faviconError) {
    return (
      <div className="resultThumbnail faviconThumbnail">
        <img
          className="faviconImage"
          src={getSiteFavicon(item.link)}
          alt=""
          onError={() => setFaviconError(true)}
        />
      </div>
    );
  }

  const letter = new URL(item.link).hostname[0].toUpperCase();

  return <div className="resultThumbnail placeholderThumbnail">{letter}</div>;
}

export default ResultThumbnail;
