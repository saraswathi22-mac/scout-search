export const getFavicon = (url) => {
  try {
    const { hostname } = new URL(url.includes("http") ? url : `https://${url}`);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
};
