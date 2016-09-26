import getClover from '../utils/get-clover'

export const command = 'get <clover_name>'
export const desc = 'Get path of clover'
export const builder = {
}

export const handler = (argv) => {
  const cloverPath = getClover(argv._[0])

  if (typeof cloverPath !== 'undefined') {
    console.log(cloverPath)
  }
} 

