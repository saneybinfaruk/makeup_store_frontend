export function formatDateString(dateString: string) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Get the date components
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Short month name
  const year = date.getUTCFullYear();

  // Get the time components and pad them with leading zeros if needed
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Format the date and time in the desired format
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
