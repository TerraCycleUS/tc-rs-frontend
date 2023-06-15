import http from '../../../../utils/http'

export default async function createRetailer(retailer, token) {
  return retailerUploadImages(retailer, token)
}

export function formatForCreate(
  retailer,
  logoUrl,
  smallLogoUrl,
  backgroundUrl,
) {
  const retailerFields = retailer
  retailerFields.smallLogo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${smallLogoUrl}`
  retailerFields.logo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${logoUrl}`
  retailerFields.backgroundImage = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${backgroundUrl}`

  return retailerFields
}

export async function retailerUploadImages(retailer, token) {
  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const logoData = new FormData()
  logoData.append('file', retailer?.logo?.rawFile)
  const newLogoUrl = await http.post(
    '/api/upload/product',
    logoData,
    sendFileConfig,
  )

  const smallLogoData = new FormData()
  smallLogoData.append('file', retailer.smallLogo.rawFile)
  const newSmallLogoUrl = await http.post(
    '/api/upload/product',
    smallLogoData,
    sendFileConfig,
  )

  const backgroundData = new FormData()
  backgroundData.append('file', retailer.backgroundImage.rawFile)
  const newBackgroundImageUrl = await http.post(
    '/api/upload/product',
    backgroundData,
    sendFileConfig,
  )

  return formatForCreate(
    retailer,
    newLogoUrl?.data?.name,
    newSmallLogoUrl?.data?.name,
    newBackgroundImageUrl?.data?.name,
  )
}
