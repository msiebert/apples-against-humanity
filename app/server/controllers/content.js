// @flow

import fs from 'fs'

import {contentDir} from '../../common/config'

export default class ContentController {
  listContent(response: ExpressResponse): void {
    response.setHeader('Content-type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')

    fs.readdir(contentDir, (err, items) => {
      const packs = items.map((file: string) => {
        return {
          file: file,
          name: JSON.parse(fs.readFileSync(`${contentDir}/${file}`, 'utf-8')).name,
        }
      })

      response.send(JSON.stringify(packs))
    })
  }

  getContentFile(response: ExpressResponse, file: string): void {
    response.setHeader('Content-type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.send(fs.readFileSync(`${contentDir}/${file}`, 'utf-8'))
  }
}
