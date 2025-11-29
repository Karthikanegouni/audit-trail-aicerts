const WordItems = ({ words, removed }) => {
  const itemColor = removed ? 'bg-red-700' : 'bg-green-700'
  return (
    <span className="flex gap-2">
      {words.map((word, index) => (
        <span
          key={word + index}
          className={`${itemColor} text-white px-2 rounded-full`}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

export default WordItems
