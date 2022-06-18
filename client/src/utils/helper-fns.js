export function calculateDays(timeString) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dayAgo = Math.round(
    Math.abs((Date.now() - new Date(timeString)) / oneDay)
  );

  return dayAgo + (dayAgo > 1 ? " days" : " day") + " ago";
}

export function calculateHours(timeString) {
  const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const hourAgo = Math.round(
    Math.abs((Date.now() - new Date(timeString)) / oneHour)
  );

  return hourAgo + (hourAgo > 1 ? " hours" : " hour") + " ago";
}

export function derivePercentage(main, total) {
  return (main / total) * 100;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateRecipients(value) {
  if (!value) return;
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Remove empty elements
  const invalidEmails = value
    .split(",")
    .map((t) => t.trim())
    .filter((t) => !re.test(t) && t !== "");

  if (invalidEmails.length)
    return `These are invalid emails: ${invalidEmails.join(" | ")}`;

  return;
}
