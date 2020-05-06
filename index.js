const process = require('process');

const port = process.env.PORT || 3000;

const jsonServer = require('json-server');
const db = require('./server/db')();
const internalError = require('./server/internal-error');
const lessHeaders = require('./server/less-headers');
const notFound = require('./server/not-found');
const auth = require('./server/auth');
const redirect = require('./server/redirect');

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

redirect(server);

server.use(auth);
server.use(middlewares);
server.use(internalError);
server.use(lessHeaders);
server.use(notFound);
server.use(router);

server.listen(port, () => {
  console.log('Macowins is running')
})
