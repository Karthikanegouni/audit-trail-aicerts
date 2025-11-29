import connectDB from '../db/connectDB.js'
import formatData from '../utils/formatData.js'

//Controller for GET: '/versions' route
export const getVersions = async (req, res) => {
  try {
    const db = await connectDB()

    const versions = await db.all(
      'SELECT * FROM versions ORDER BY timestamp DESC' // Get versions in newest-first order
    )

    // Parse JSON arrays
    const formattedResponse = versions.map((row) => ({
      id: row.id,
      timestamp: row.timestamp,
      addedWords: JSON.parse(row.addedWords || '[]'),
      removedWords: JSON.parse(row.removedWords || '[]'),
      oldLength: parseInt(row.oldLength),
      newLength: parseInt(row.newLength),
    }))

    res.status(200).json(formattedResponse)
  } catch (e) {
    console.error(e)
    res.status(500).json({ errorMessage: e.message || 'Internal Server Error' })
  }
}

//Controller for POST: '/save-version' route
export const saveVersion = async (req, res) => {
  try {
    const db = await connectDB()
    const { text: currentText } = req.body

    if (typeof currentText !== 'string') {
      return res
        .status(400)
        .json({ errorMessage: 'Type String is required with key as text' })
    }

    const lastVersion = await db.get(
      'SELECT text FROM versions ORDER BY timestamp DESC LIMIT 1'
    )

    const prevText = lastVersion ? lastVersion.text : ''

    if (prevText === currentText.trim().split(/\s+/).filter(Boolean).join(' '))
      return res.status(400).json({
        errorMessage: 'No changes Made, same content received',
      })
    const {
      id,
      timestamp,
      addedWords,
      removedWords,
      oldLength,
      newLength,
      text,
    } = formatData(prevText, currentText)

    await db.run(
      `INSERT INTO versions (id, timestamp, addedWords, removedWords, oldLength, newLength, text)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        timestamp,
        JSON.stringify(addedWords),
        JSON.stringify(removedWords),
        oldLength,
        newLength,
        text,
      ]
    )

    res.status(201).json({
      ok: true,
      updatedText: text,
      message: 'Content Updated Successfully',
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ errorMessage: error.message || 'Internal Server Error' })
  }
}
