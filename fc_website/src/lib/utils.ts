// 2023-11-03 => 3 novembre 2023
export function formatDateVerbose(dateStr: string): string {
  const [year, month, day] = dateStr
    .split('-')
    .map((part) => parseInt(part, 10))
  const date = new Date(year, month - 1, day)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('fr-FR', options)
  return formatter.format(date)
}
