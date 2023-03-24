import { TaskType } from "./TaskType"

export type ChangesType = {
    changes: {
        task: {
            created: TaskType[]
            updated: TaskType[]
            deleted: string[]
        }
    }
}