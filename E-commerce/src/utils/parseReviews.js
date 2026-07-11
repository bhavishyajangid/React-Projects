export function parseReviews(reviews) {
  if (!reviews || !Array.isArray(reviews)) return [];

  return reviews
    .map((item) => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}
