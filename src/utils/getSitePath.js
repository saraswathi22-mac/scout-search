export const getSitePath = (url) => {
  try {
    const { hostname, pathname } = new URL(
      url.startsWith("http") ? url : `https://${url}`
    );

    const path = pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 2) // Show only first two segments
      .join(" › ");

    return path ? `${hostname} › ${path}` : hostname;
  } catch {
    return "";
  }
};
