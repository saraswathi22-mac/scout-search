export const getSiteName = (url) => {
  try {
    const { hostname } = new URL(url.includes("http") ? url : `https://${url}`);
    const parts = hostname.replace(/^www\./, "").split(".");

    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }

    return hostname;
  } catch (err) {
    return url;
  }
};
