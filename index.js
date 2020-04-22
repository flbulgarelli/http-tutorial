// server.js
const jsonServer = require('json-server');;
const db = require('./server/db');
const internalError = require('./server/internal-error');
const lessHeaders = require('./server/less-headers');
const notFound = require('./server/not-found');


const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
