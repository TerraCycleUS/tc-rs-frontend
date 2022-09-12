export default function formatForUpdate(resource, data, language) {
  switch (resource) {
    case 'user':
      return forUpdateUser(data)
    case 'coupon':
      return forUpdateCoupon(data, language)
    default:
      return data
  }
}

function forUpdateUser(user) {
  const userFields = user
  if (userFields.retailerId === '') userFields.retailerId = null
  delete userFields.status
  delete userFields.id
  delete userFields.role
  return userFields
}

function forUpdateCoupon(coupon, language) {
  const couponFields = coupon
  couponFields.langId = language
  Object.keys(couponFields).forEach((key) => {
    if (couponFields[key] === null) {
      delete couponFields[key]
    }
  })
  delete couponFields.status
  delete couponFields.id
  delete couponFields.createdAt
  delete couponFields.updatedAt
  return couponFields
}
