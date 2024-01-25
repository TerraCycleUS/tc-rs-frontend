import http from "../../../../utils/http";

export default async function forUpdateCoupon(coupon, language, token) {
  if (
    coupon.brandLogo?.rawFile ||
    coupon.backgroundImage?.rawFile ||
    coupon.eanCodePicURL?.rawFile
  )
    return couponUpdateFiles(coupon, language, token);
  return formatCoupon(coupon, language);
}

function formatCoupon(
  coupon,
  language,
  brandUrl = null,
  backgroundUrl = null,
  eanCodePicURL = null
) {
  const couponFields = coupon;
  couponFields.langId = language;
  if (brandUrl) {
    couponFields.brandLogo = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${brandUrl}`;
  }
  if (backgroundUrl) {
    couponFields.backgroundImage = `${process.env.REACT_APP_SERVER_API_URL}/api/file/${backgroundUrl}`;
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
  let newBrandLogoUrl = null;
  let newBackgroundImageUrl = null;
  let newEanCodePicURL = null;
  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const brandData = new FormData();
  brandData.append("file", coupon.brandLogo?.rawFile);
  if (coupon.brandLogo?.rawFile) {
    newBrandLogoUrl = await http.post(
      "/api/upload/product",
      brandData,
      sendFileConfig
    );
  }

  const backgroundData = new FormData();
  backgroundData.append("file", coupon.backgroundImage?.rawFile);
  if (coupon.backgroundImage?.rawFile) {
    newBackgroundImageUrl = await http.post(
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
    newBrandLogoUrl?.data?.name,
    newBackgroundImageUrl?.data?.name,
    newEanCodePicURL?.data?.name
  );
}
