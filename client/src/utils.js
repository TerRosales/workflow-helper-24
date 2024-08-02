export const truncateText = (username, limiter) => {
    return username.length > 9 ? username.substring(0, limiter) + "..." : username;
  };