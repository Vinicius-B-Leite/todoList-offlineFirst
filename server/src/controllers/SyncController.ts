import { Request, Response } from "express";
import { prisma } from "../prisma";
import { ChangesType } from "../types/ChangesType";


class SyncController {
    async push(req: Request, res: Response) {
        const { changes } = req.body as ChangesType

        if (changes.task.created) {
            for (const t of changes.task.created) {
                await prisma.tasks.create({
                    data: {
                        id: t.id,
                        description: t.description,
                        createdat: new Date(t.created_at as number),
                    }
                })
            }

        }
        if (changes.task.deleted) {
            await prisma.tasks.deleteMany({
                where: {
                    id: {
                        in: changes.task.deleted
                    }
                }
            })

        }
        if (changes.task.updated) {
            for (const t of changes.task.updated) {
                await prisma.tasks.update({
                    where: {
                        id: t.id
                    },
                    data: {
                        updatedat: new Date(),
                        description: t.description
                    }
                })
            }

        }

        return res.json({ message: 'sync already' })
    }

    async pull(req: Request, res: Response) {
        const lastPulledAt = req.query.lastPulledAt


        if (!lastPulledAt) {
            const tasks = await prisma.tasks.findMany()
            return res.json({
                changes: {
                    task: {
                        created: tasks,
                        updated: [],
                        deleted: []
                    }
                },
                timestamp: Date.now()
            })
        }

        const created = await prisma.tasks.findMany({
            where: {
                createdat: {
                    gt: new Date(parseInt(lastPulledAt as string))
                }
            }
        })
        const updated = await prisma.tasks.findMany({
            where: {
                updatedat: {
                    gt: new Date(parseInt(lastPulledAt as string))
                }
            }
        })


        return res.json({
            changes: {
                task: {
                    created,
                    updated,
                    deleted: []
                }
            },
            timestamp: Date.now()
        })
    }
}

export const syncController = new SyncController()