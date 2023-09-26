const countryLock = ['AU', 'IT', 'US', 'NZ']

export default function isEmptyStates(countryCode: string): boolean {
  return !countryLock.includes(countryCode)
}
