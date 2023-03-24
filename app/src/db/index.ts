import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schemas from './schemas'
import { Task } from './model'
import { migration } from './migration'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema: schemas,
    migrations: migration
})

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [
        Task
    ],
})