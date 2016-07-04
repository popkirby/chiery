import replaceEnv from './replace-env.js'

const chieryDir = process.env.CHIERYDIR ? process.env.CHIERYDIR : replaceEnv('$HOME/.chiery')

export default chieryDir
