export default function formatDate(dateString) {
  const newDate = new Date(dateString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getUTCFullYear();
  return `${date}.${month}.${year}`;
}
