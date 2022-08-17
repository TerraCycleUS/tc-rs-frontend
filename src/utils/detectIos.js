export default function detectIos() {
  return /iPhone|iPad|iPod|iPad Simulator|iPhone Simulator/i.test(
    navigator.userAgent,
  )
}
