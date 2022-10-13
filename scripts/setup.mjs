import { TigrisDataTypes } from '@tigrisdata/core/dist/types.js'
import { Tigris } from '@tigrisdata/core'
import dotenv from 'dotenv'

// TODO: Add error handling
dotenv.config({ path: '.env.local' })
const inputUrl = process.env.TIGRIS_HOST
console.log(`Bootstrapping database and collection at ${inputUrl}....`)

const DB_NAME = 'helloTigris'
const COLLECTION_NAME = 'todoItems'
const tigris = new Tigris({ serverUrl: inputUrl, insecureChannel: true })

// setup db
const db = await tigris.createDatabaseIfNotExists(DB_NAME)
console.log(`Created database: ${DB_NAME}`)

// schema definition
const todoItemSchema = {
  id: {
    type: TigrisDataTypes.INT32,
    primary_key: { order: 1, autoGenerate: true }
  },
  text: { type: TigrisDataTypes.STRING },
  completed: { type: TigrisDataTypes.BOOLEAN },
}

// create collection
const collection = await db.createOrUpdateCollection(COLLECTION_NAME,
  todoItemSchema)
console.log(`Created collection: ${COLLECTION_NAME}`)

export const documents = [
  {
    id: 1,
    text: 'Bread',
    completed: false
  },
  {
    id: 2,
    text: 'Pasta',
    completed: false
  },
  {
    id: 3,
    text: 'Cereal',
    completed: false
  }
]
// insert documents
const inserted = await collection.insertMany(documents)
console.log(`Inserted ${inserted.length} documents`)
