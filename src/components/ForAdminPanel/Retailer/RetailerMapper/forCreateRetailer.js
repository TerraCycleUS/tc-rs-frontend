import http from '../../../../utils/http'

export default async function forCreateRetailer(retailer, token) {
  if (
    retailer.logo?.rawFile ||
    retailer.brandLogo?.rawFile ||
    retailer.backgroundImage?.rawFile
  )
    return retailerUpdateFiles(retailer, token)
  return formatRetailer(retailer)
}

function formatRetailer(
  retailer,
  logoUrl = null,
  smallLogoUrl = null,
  backgroundUrl = null,
) {
  const retailerFields = retailer
  if (smallLogoUrl) {
    retailerFields.smallLogo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${smallLogoUrl}`
  }
  if (logoUrl) {
    retailerFields.logo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${logoUrl}`
  }
  if (backgroundUrl) {
    retailerFields.backgroundImage = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${backgroundUrl}`
  }
  Object.keys(retailerFields).forEach((key) => {
    if (retailerFields[key] === null) {
      delete retailerFields[key]
    }
  })
  delete retailerFields.id
  delete retailerFields.createdAt
  delete retailerFields.updatedAt
  return retailerFields
}

async function retailerUpdateFiles(coupon, token) {
  let newLogoUrl = null
  let newSmallLogoUrl = null
  let newBackgroundImageUrl = null
  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const logoData = new FormData()
  logoData.append('file', coupon.logo.rawFile)
  if (coupon.logo.rawFile) {
    newLogoUrl = await http.post(
      '/api/upload/product',
      logoData,
      sendFileConfig,
    )
  }

  const smallLogoData = new FormData()
  smallLogoData.append('file', coupon.smallLogo.rawFile)
  if (coupon.smallLogo.rawFile) {
    newSmallLogoUrl = await http.post(
      '/api/upload/product',
      smallLogoData,
      sendFileConfig,
    )
  }

  const backgroundData = new FormData()
  backgroundData.append('file', coupon.backgroundImage.rawFile)
  if (coupon.backgroundImage.rawFile) {
    newBackgroundImageUrl = await http.post(
      '/api/upload/product',
      backgroundData,
      sendFileConfig,
    )
  }

  return formatRetailer(
    coupon,
    newLogoUrl?.data?.name,
    newSmallLogoUrl?.data?.name,
    newBackgroundImageUrl?.data?.name,
  )
}
