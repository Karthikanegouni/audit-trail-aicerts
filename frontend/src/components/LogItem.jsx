import WordItems from './WordItems'

const LogItem = ({ data }) => {
  const { timestamp, addedWords, removedWords, oldLength, newLength } = data
  return (
    <li className="border p-3 flex flex-col gap-1.5 rounded-md overflow-x-auto">
      <p className="flex gap-2">
        <span className="font-semibold">TimeStamp:</span>
        {timestamp}
      </p>
      <p className="flex gap-2">
        <span className="font-semibold whitespace-pre">Added words: </span>{' '}
        {addedWords.length !== 0 ? (
          <WordItems words={addedWords} />
        ) : (
          'No words were Added'
        )}
      </p>
      <p className="flex gap-2">
        <span className="font-semibold whitespace-pre">Removed words: </span>
        {removedWords.length !== 0 ? (
          <WordItems removed words={removedWords} />
        ) : (
          'No words were removed'
        )}
      </p>
      <p>
        <span className="font-semibold">Old Length: </span>
        {oldLength}
      </p>
      <p>
        <span className="font-semibold">New Length: </span>
        {newLength}
      </p>
    </li>
  )
}

export default LogItem
