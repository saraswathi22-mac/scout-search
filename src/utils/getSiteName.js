export const getSiteName = (url) => {
  try {
    const { hostname } = new URL(url.includes("http") ? url : `https://${url}`);
    const parts = hostname.replace(/^www\./, "").split(".");

    return parts.length >= 2 ? capitalize(parts[parts.length - 2]) : hostname;
  } catch (err) {
    return url;
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
