export const formatTime = (date: Date) =>
  date.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
  });

export const formatDate = (date: Date) =>
  date.toLocaleDateString("sv-SE", {
    timeZone: "Europe/Stockholm",
  });
