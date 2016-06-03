import editor from 'editor'
import fs from 'fs'
import getClover from '../utils/get-clover'
import path from 'path'

export const command = 'edit <clover_name>'
export const desc = 'Edit clovers'
export const builder = {
}

export const handler = (argv) => {
  const cloverPath = getClover(argv.clover_name)

  editor(cloverPath, (err) => {})
} 

