export default function extractErrorMessage(res) {
  let text = null
  if (res?.response?.data) {
    const { data } = res.response
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        text = data.errors.join('\n')
      } else {
        text = data.errors
      }
    } else {
      text = data.message
    }
  } else {
    text = res.message
  }
  return text
}
