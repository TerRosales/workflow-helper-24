export const truncateText = (text, limiter) => {
  return text.length > 9 ? text.substring(0, limiter) + "..." : text;
};
