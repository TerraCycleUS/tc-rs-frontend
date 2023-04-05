export function isValidHttpUrl(string) {
  try {
    const url = new URL(string)
    // console.log('url', url)
    // console.log('url', url.protocol)
    // console.log('url.protocol === \'http:\' || url.protocol === \'https:\'', url.protocol === 'http:' || url.protocol === 'https:')

    // return url.protocol === 'http:' || url.protocol === 'https:'
    // return url.protocol === 'https:'
    return url.protocol === 'https:'
  } catch (err) {
    return false
  }
}
