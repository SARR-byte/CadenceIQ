export async function addToCalendar(event: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}) {
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&details=${encodeURIComponent(event.description)}&dates=${event.startDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")}/${event.endDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")}`;

  window.open(googleCalendarUrl, "_blank");
}