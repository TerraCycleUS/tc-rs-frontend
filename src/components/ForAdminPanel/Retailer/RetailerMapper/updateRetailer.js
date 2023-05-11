import http from '../../../../utils/http'

export default async function updateRetailer(retailer, language, token) {
  if (
    retailer.logo?.rawFile ||
    retailer.brandLogo?.rawFile ||
    retailer.backgroundImage?.rawFile
  )
    return retailerUpdateImages(retailer, language, token)
  return formatForUpdate(retailer, language)
}

export function formatForUpdate(
  retailer,
  language,
  logoUrl = null,
  smallLogoUrl = null,
  backgroundUrl = null,
) {
  const retailerFields = retailer
  retailerFields.langId = language
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

export async function retailerUpdateImages(retailer, language, token) {
  let newLogoUrl = null
  let newSmallLogoUrl = null
  let newBackgroundImageUrl = null
  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  if (retailer.logo.rawFile) {
    const logoData = new FormData()
    logoData.append('file', retailer.logo.rawFile)
    newLogoUrl = await http.post(
      '/api/upload/product',
      logoData,
      sendFileConfig,
    )
  }

  if (retailer.smallLogo.rawFile) {
    const smallLogoData = new FormData()
    smallLogoData.append('file', retailer.smallLogo.rawFile)
    newSmallLogoUrl = await http.post(
      '/api/upload/product',
      smallLogoData,
      sendFileConfig,
    )
  }

  if (retailer.backgroundImage.rawFile) {
    const backgroundData = new FormData()
    backgroundData.append('file', retailer.backgroundImage.rawFile)
    newBackgroundImageUrl = await http.post(
      '/api/upload/product',
      backgroundData,
      sendFileConfig,
    )
  }

  return formatForUpdate(
    retailer,
    language,
    newLogoUrl?.data?.name,
    newSmallLogoUrl?.data?.name,
    newBackgroundImageUrl?.data?.name,
  )
}
