// helper function to generate and format the data
const getFormatedData = (prevText, currentText) => {
  const prevWords = prevText.trim().split(/\s+/).filter(Boolean)
  const currentWords = currentText.trim().split(/\s+/).filter(Boolean)

  const data = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    addedWords: currentWords.filter((word) => !prevWords.includes(word)),
    removedWords: prevWords.filter((word) => !currentWords.includes(word)),
    oldLength: prevWords.length,
    newLength: currentWords.length,
    text: currentWords.join(' '),
  }
  return data
}

export default getFormatedData
