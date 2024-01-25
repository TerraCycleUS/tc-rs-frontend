export default function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return process.env.REACT_APP_LINK_TO_GOOGLEPLAY;
  }

  if (/iPad|iPhone|iPod|Mac/.test(userAgent) && !window.MSStream) {
    return process.env.REACT_APP_LINK_TO_APPSTORE;
  }
  return process.env.REACT_APP_LINK_TO_GOOGLEPLAY;
}
