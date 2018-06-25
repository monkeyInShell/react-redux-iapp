/**
 * Created by ink on 2018/4/3.
 */
const mapStringAssets = (key) => {
  let mapObj = global.staticAssetsMapping
  if (typeof global.staticAssetsMapping === 'string' && global.staticAssetsMapping) {
    mapObj = JSON.parse(global.staticAssetsMapping)
  }
  const value = mapObj[key]
  const jsMatch = /\.js$/
  const cssMath = /\.css$/
  let srcString = ''
  if (jsMatch.test(value)) {
    srcString = `<script src="${value}"></script>`
  } else if (cssMath.test(value)) {
    srcString = `<link rel="stylesheet" href="${value}" />`
  }
  return srcString
}
export default mapStringAssets
