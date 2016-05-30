// @flow

export const get = (url: string) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', encodeURI(url))
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.responseText)
    } else {
      reject(xhr.status)
    }
  }
  xhr.send()
})
