import * as dotenv from 'dotenv'
import { getBaserowApiToken } from './utils'
import { run } from './baserow'
dotenv.config()

console.log('@@@ hello index')

run()
