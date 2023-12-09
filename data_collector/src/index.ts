import * as dotenv from 'dotenv'
import { getBaserowApiToken } from './utils'
dotenv.config()

console.log('@@@ hello index')

console.log('@@@ using ', getBaserowApiToken())
