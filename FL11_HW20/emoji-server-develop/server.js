const jsonServer  = require('json-server')
const server      = jsonServer.create()
const router      = jsonServer.router(require('./routes.js')())
const middlewares = jsonServer.defaults()
const port = 1337;

server.use(middlewares)
server.use(router)
server.listen(port, function () {
  console.log(`Server is running on port ${port}!`)
})