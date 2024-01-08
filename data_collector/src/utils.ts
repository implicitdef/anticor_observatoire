import * as fs from 'fs-extra'

export function getBaserowApiToken(): string {
  const key = `BASEROW_API_TOKEN`
  const token = process.env[key]
  if (!token) {
    throw new Error(`Missing env var ${key}`)
  }
  return token
}

export function writeToJsonFile(path: string, data: any) {
  console.log(`Writing to JSON file ${path}`)
  fs.removeSync(path)
  fs.ensureFileSync(path)
  fs.writeJSONSync(path, data, { spaces: 2 })
}

export function readJsonFile(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'))
}
