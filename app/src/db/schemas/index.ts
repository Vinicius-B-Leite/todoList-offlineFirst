import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'task',
            columns: [
                {
                    name: 'description',
                    type: 'string'
                },
                {
                    name: 'created_at',
                    type: 'number'
                },
                {
                    name: 'updated_at',
                    type: 'number'
                },
            ]
        })
    ]
})