export default function detectIos() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    /iPhone|iPad|iphone|ios|IOS|iPod|iPad Simulator|iPhone Simulator/i.test(
      navigator.userAgent
    )
  );
}
