// Define the getRelativeTime function// Import the function from date-fns
import { formatDistanceToNow } from "/dist/assets/date-fns/index.mjs";

function getRelativeTime(date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

// Expose the function globally
window.getRelativeTime = getRelativeTime;
