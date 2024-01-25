export function fbLoginUrl(lang) {
  return `https://www.facebook.com/v14.0/dialog/oauth?scope=email,public_profile&state=${JSON.stringify(
    { lang }
  )}&client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${
    process.env.REACT_APP_SERVER_API_URL
  }/api/auth/facebook/code`;
}

export function googleLoginUrl(lang) {
  return `${process.env.REACT_APP_SERVER_API_URL}/api/auth/google/auth?lang=${lang}`;
}
