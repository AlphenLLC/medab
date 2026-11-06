export function toTitleCase(str) {
  if (!str) return ''

  const minorWords = ['ve', 'veya', 'ile', 'de', 'da', 'için']

  return str
    .split(' ')
    .map((word, index) => {
      if (!word) return ''

      const cleanWord = word.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, '')
      if (cleanWord.toLocaleLowerCase('tr-TR') === 'medab') {
        return word.replace(new RegExp(cleanWord, 'i'), 'MedAB')
      }

      const lower = word.toLocaleLowerCase('tr-TR')
      if (index > 0 && minorWords.includes(lower)) {
        return lower
      }

      return lower.charAt(0).toLocaleUpperCase('tr-TR') + lower.slice(1)
    })
    .join(' ')
}