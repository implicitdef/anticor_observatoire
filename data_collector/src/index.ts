import * as dotenv from 'dotenv'
import { readBaserow } from './baserow'
import { writeToJsonFile } from './utils'
dotenv.config()

const OUT_FILE = `./data/rows.json`

async function start() {
  console.log(`Launching data collector...`)
  const rows = await readBaserow()
  writeToJsonFile(OUT_FILE, rows)
}

start()
