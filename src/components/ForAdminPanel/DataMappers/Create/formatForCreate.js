import createRetailer from '../../Retailer/RetailerMapper/createRetailer'

export default function formatForCreate(resource, data, language, token) {
  switch (resource) {
    case 'retailer':
      return createRetailer(data, token)
    default:
      return data
  }
}
