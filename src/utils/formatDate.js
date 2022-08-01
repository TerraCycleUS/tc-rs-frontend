export default function formatDate(dateString) {
  const newDate = new Date(dateString)
  const date = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  return `${date}.${month}.${year}`
}
