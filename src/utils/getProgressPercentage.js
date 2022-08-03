export default function getProgressPercentage(availableAmount, requiredAmount) {
  const progress = (availableAmount / requiredAmount) * 100
  if (progress > 100) return '100%'
  return `${progress}%`
}
