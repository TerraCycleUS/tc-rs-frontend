export default function getUserMedia(constraints) {
  if (!navigator.mediaDevices) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      navigator.getUserMedia(constraints, resolve, reject);
    });
  }

  return navigator.mediaDevices.getUserMedia(constraints);
}
