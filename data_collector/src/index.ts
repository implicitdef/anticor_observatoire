import * as dotenv from 'dotenv'
import { readBaserow } from './baserow'
import { writeToJsonFile } from './utils'
dotenv.config()

console.log('@@@ hello index')

const OUT_FILE = `./data/rows.json`

async function start() {
  const rows = await readBaserow()
  writeToJsonFile(OUT_FILE, rows)
}

start()
