import { field, text } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'


export class Task extends Model {
    static table = 'task'
    @field('description') description!: string
}