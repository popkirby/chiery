import fse from 'fs-extra'
import Promise from 'bluebird'

export default Promise.promisifyAll(fse)
