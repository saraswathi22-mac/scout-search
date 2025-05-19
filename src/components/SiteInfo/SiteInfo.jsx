import { getFavicon } from "../../utils/getFavicon";
import { getSiteName } from "../../utils/getSiteName";
import "./SiteInfo.css";

const SiteInfo = ({ url }) => {
  const siteName = getSiteName(url);
  const faviconUrl = getFavicon(url);
  return (
    <a href={url} className="site-info">
      <img src={faviconUrl} alt={`${siteName} icon`} className="site-icon" />
      <span className="site-name">{siteName}</span>
    </a>
  );
};

export default SiteInfo;
