export const stringOrRegexError = (text: string | RegExp) =>
  typeof text === 'string' ? `with ${text}` : `matching ${text}`
