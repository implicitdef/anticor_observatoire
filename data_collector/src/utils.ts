export function getBaserowApiToken(): string {
  const key = `BASEROW_API_TOKEN`
  const token = process.env[key]
  if (!token) {
    throw new Error(`Missing env var ${key}`)
  }
  return token
}
