export const truncateText = (text, limiter) => {
  return text.length > 9 ? text.substring(0, limiter) + "..." : text;
};

export const formatKey = (key) => {
  if (key == null) {
    return ""; // or handle it in a way that makes sense for your application
  }
  return key
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/(bore|seal)/gi, " $1") // Add space before "bore" and "seal"
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export const formatKeyLines = (key) => {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
