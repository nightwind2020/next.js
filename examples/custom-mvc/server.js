const fastify = require('fastify')({ logger: { level: 'error' } })
const Next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

fastify.register((fastify, opts, next) => {
  const app = Next({ dev })

  fastify.decorateReply('view', async function(template, data) {
    this.res.viewdata = data
    return await app.render(this.request.req, this.res, template, this.request.query)
  })

  app
    .prepare()
    .then(() => {
      // use next.js as a view engine
      fastify.get('/a', async (req, res) => {
        const data = { msg: 'Make MVC Great Again.' } // DB.query() etc.
        return await res.view('/a', data)
      })

      if (dev) {
        fastify.get('/_next/*', (req, reply) => {
          return app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true
          })
        })
      }

      fastify.all('/*', (req, reply) => {
        return app.handleRequest(req.req, reply.res).then(() => {
          reply.sent = true
        })
      })

      fastify.setNotFoundHandler((request, reply) => {
        return app.render404(request.req, reply.res).then(() => {
          reply.sent = true
        })
      })

      next()
    })
    .catch(err => next(err))
})

fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
