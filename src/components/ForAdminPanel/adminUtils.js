export function findRetailer(retailerId, retailers) {
  return retailers?.find((retailer) => retailer.id === retailerId)?.name
}

export const onError = (error, notify) => {
  notify(`Error: ${error?.body?.errors || error?.body?.message}`)
}
export function formatForApi(dateToFormat) {
  return new Date(dateToFormat).getTime()
}
