import { Router } from "express";
import { syncController } from "./controllers/SyncController";

const routes = Router()

routes.post('/sync', syncController.push)
routes.get('/sync', syncController.pull)


export default routes