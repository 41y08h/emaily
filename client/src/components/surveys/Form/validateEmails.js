const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  if (!emails) return "Recipients' emails are required";

  // Remove empty elements
  const invalidEmails = emails
    .split(",")
    .map((t) => t.trim())
    .filter((t) => !re.test(t) && t !== "");

  if (invalidEmails.length)
    return `These are invalid emails: ${invalidEmails.join(" | ")}`;

  return;
};
