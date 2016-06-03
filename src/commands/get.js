import editor from 'editor'
import fs from 'fs'
import getClover from '../utils/get-clover'
import path from 'path'

export const command = 'get <clover_name>'
export const desc = 'Get path of clover'
export const builder = {
}

export const handler = (argv) => {
  const cloverPath = getClover(argv.clover_name)

  if (typeof cloverPath !== 'undefined') {
    console.log(cloverPath)
  }
} 

