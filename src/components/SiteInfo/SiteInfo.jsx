import { getSiteFavicon } from "../../utils/getSiteFavicon";
import { getSiteName } from "../../utils/getSiteName";
import { getSitePath } from "../../utils/getSitePath";
import "./SiteInfo.css";

const SiteInfo = ({ url }) => {
  const siteName = getSiteName(url);
  const faviconUrl = getSiteFavicon(url);
  const sitePath = getSitePath(url);
  return (
    <a href={url} className="site-info">
      <img src={faviconUrl} alt={`${siteName} icon`} className="site-icon" />

      <div className="site-details">
        <span className="site-name">{siteName}</span>
        <span className="site-path">{sitePath}</span>
      </div>
    </a>
  );
};

export default SiteInfo;
