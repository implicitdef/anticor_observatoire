import * as dotenv from 'dotenv'
import { NiceRow, readBaserow } from './baserow'
import { readJsonFile, writeToJsonFile } from './utils'
dotenv.config()

const OUT_FILE = `./data/rows.json`

async function start() {
  console.log(`Launching data collector...`)
  const rows = await readBaserow()
  writeToJsonFile(OUT_FILE, rows)
}

async function analyze() {
  console.log('analyzing...')
  const data = readJsonFile(OUT_FILE) as NiceRow[]
  data.forEach((item) => {
    const procedure = item.procedure
    if (procedure.length > 1) {
      console.log('BIG', procedure)
    } else if (procedure.length === 1) {
      console.log(procedure[0])
    }
  })
}

if (process.argv.some((_) => _ === '--analyze')) {
  // alternate command, to be used in dev to analyze the data
  // use with : yarn start --analyze
  analyze()
} else {
  // standard run
  start()
}
