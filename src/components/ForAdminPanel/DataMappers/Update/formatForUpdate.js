import forUpdateUser from '../../User/UserMapper/forUpdateUser'
import forUpdateCoupon from '../../Coupon/CouponMapper/forUpdateCoupon'
import updateRetailer from '../../Retailer/RetailerMapper/updateRetailer'

export default function formatForUpdate(resource, data, language, token) {
  switch (resource) {
    case 'user':
      return forUpdateUser(data)
    case 'coupon':
      return forUpdateCoupon(data, language, token)
    case 'retailer':
      return updateRetailer(data, language, token)
    default:
      return data
  }
}
