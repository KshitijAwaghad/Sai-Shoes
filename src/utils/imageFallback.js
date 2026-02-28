export const FALLBACK_SHOE_IMAGE =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='900' viewBox='0 0 900 900'%3E%3Crect width='900' height='900' fill='%23f3f3f3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='Arial, sans-serif' font-size='44'%3ESai Shoes%3C/text%3E%3C/svg%3E";

export function withFallback(event) {
  const { currentTarget } = event;
  if (currentTarget.src !== FALLBACK_SHOE_IMAGE) {
    currentTarget.src = FALLBACK_SHOE_IMAGE;
  }
}
