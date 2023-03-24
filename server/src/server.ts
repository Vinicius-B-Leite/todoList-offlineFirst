import express from 'express'
import routes from './routes'

const server = express()
server.use(express.json())
server.use(routes)

const port = 9090
server.listen(port, () => console.log('server is running'))