import forCreateRetailer from '../../Retailer/RetailerMapper/forCreateRetailer'

export default function formatForCreate(resource, data, language, token) {
  switch (resource) {
    case 'retailer':
      return forCreateRetailer(data, token)
    default:
      return data
  }
}
