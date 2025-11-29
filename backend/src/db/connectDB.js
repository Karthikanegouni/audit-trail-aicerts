import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const connectDB = async () => {
  try {
    const db = await open({
      filename: 'audit.db',
      driver: sqlite3.Database,
    })
    return db
  } catch (e) {
    console.log('DB Error: ', e)
    process.exit(1)
  }
}

export default connectDB
