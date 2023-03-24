import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import { database } from '../db';
import { Task } from '../db/model';



type TaskContextType = {
    getTasksCache(): Promise<Task[]>
    createTask(description: string): Promise<Task[]>
    updateTask(t: Task, newDescription: string): Promise<Task[]>
    deletetask(t: Task): Promise<Task[]>
}

export const TaskContext = createContext({} as TaskContextType)

const TaskProvider = ({ children }: { children: React.ReactNode }) => {

    async function getTasksCache() {
        const taskCollection = database.get<Task>('task')
        const t = await taskCollection.query().fetch()
        return t
    }

    async function createTask(description: string) {
        const taskCollection = database.get<Task>('task')
        database.write(async () => {
            await taskCollection.create(t => {
                t.description = description
            })
        })
        return await getTasksCache()
    }


    async function updateTask(t: Task, newDescription: string) {
        const taskCollection = database.get<Task>('task')
        const taskToUpdate = await taskCollection.find(t.id)
        database.write(async () => {
            await taskToUpdate.update(t => {
                t.description = newDescription
            })
        })
        return await getTasksCache()
        
    }

    async function deletetask(t: Task) {
        const taskCollection = database.get<Task>('task')
        const tasksToDelete = await taskCollection.find(t.id)

        database.write(async () => {
            await tasksToDelete.markAsDeleted()
        })
        return await getTasksCache()
    }
    return (
        <TaskContext.Provider value={{
            getTasksCache,
            createTask,
            updateTask,
            deletetask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => useContext(TaskContext)
export default TaskProvider;