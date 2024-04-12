import http from "../../../../utils/http";

export default async function forUpdateCoupon(coupon, language, token) {
  if (
    coupon.retailerLogo?.rawFile ||
    coupon.brandLogo?.rawFile ||
    coupon.eanCodePicURL?.rawFile
  )
    return couponUpdateFiles(coupon, language, token);
  return formatCoupon(coupon, language);
}

function formatCoupon(
  coupon,
  language,
  retailerLogoUrl = null,
  brandLogoUrl = null,
  eanCodePicURL = null
) {
  const couponFields = coupon;
  couponFields.langId = language;
  if (retailerLogoUrl) {
    couponFields.retailerLogo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${retailerLogoUrl}`;
  }
  if (brandLogoUrl) {
    couponFields.brandLogo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${brandLogoUrl}`;
  }
  if (eanCodePicURL) {
    couponFields.eanCodePicURL = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${eanCodePicURL}`;
  }
  Object.keys(couponFields).forEach((key) => {
    if (couponFields[key] === null) {
      delete couponFields[key];
    }
  });
  delete couponFields.id;
  delete couponFields.createdAt;
  delete couponFields.updatedAt;
  delete couponFields.retailerId;
  return couponFields;
}

async function couponUpdateFiles(coupon, language, token) {
  let newRetailerLogoUrl = null;
  let newBrandLogoUrl = null;
  let newEanCodePicURL = null;
  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const brandData = new FormData();
  brandData.append("file", coupon.retailerLogo?.rawFile);
  if (coupon.retailerLogo?.rawFile) {
    newRetailerLogoUrl = await http.post(
      "/api/upload/product",
      brandData,
      sendFileConfig
    );
  }

  const backgroundData = new FormData();
  backgroundData.append("file", coupon.brandLogo?.rawFile);
  if (coupon.brandLogo?.rawFile) {
    newBrandLogoUrl = await http.post(
      "/api/upload/product",
      backgroundData,
      sendFileConfig
    );
  }

  const eanCodePicURLData = new FormData();
  eanCodePicURLData.append("file", coupon.eanCodePicURL?.rawFile);
  if (coupon.eanCodePicURL?.rawFile) {
    newEanCodePicURL = await http.post(
      "/api/upload/product",
      eanCodePicURLData,
      sendFileConfig
    );
  }

  return formatCoupon(
    coupon,
    language,
    newRetailerLogoUrl?.data?.name,
    newBrandLogoUrl?.data?.name,
    newEanCodePicURL?.data?.name
  );
}
