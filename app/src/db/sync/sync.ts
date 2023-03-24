import { synchronize } from "@nozbe/watermelondb/sync"
import axios from "axios"
import { database } from '../index'


export async function mySync() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
            try {

                const baseUrl = `http://localhost:9090/sync?lastPulledAt=${lastPulledAt ?? ''}`
                const { data } = await axios.get(baseUrl)
                return { changes: data.changes, timestamp: data.timestamp }

            } catch (error) {
                throw new Error('Error in src/components/home ~ line 31')
            }
        },
        pushChanges: async ({ changes, lastPulledAt, }) => {
            try {
                await axios.post('http://localhost:9090/sync', { changes })
            } catch (error) {
                throw new Error('Error in src/components/home ~ line 42')
            }

        },
        migrationsEnabledAtVersion: 1,
    })
}