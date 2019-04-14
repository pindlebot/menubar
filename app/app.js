require('dotenv').config()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: require('../next.config.js') })
const bodyParser = require('body-parser')
const handle = app.getRequestHandler()
const redis = require('redis')

const {
  sendEmail,
  createFetch,
  fetchRepositories,
  fetchPage,
  fetchPost
} = require('./api')

const {
  PROJECT_ID
} = process.env

const cache = require('apicache')
  .options({ redisClient: redis.createClient(process.env.REDIS_URL) })
  .middleware

app.prepare().then(async () => {
  const server = express()
  server.post('/send', bodyParser.json(), async (req, res) => {
    const body = req.body
    await sendEmail(body)
    res.status(200).json({})
  })

  server.post('/search', bodyParser.json(), async (req, res) => {
    const body = req.body
    let data = await createFetch({
      query: `{
        feed(projectId: "${PROJECT_ID}", query: "${body.query}") {
          posts {
            id,
            title
            slug
          }
        }
      }`
    })
    res.status(200).json(data)
  })

  server.post('/api/projects', cache('30 minutes'), bodyParser.json(), async (req, res) => {
    let repositories = await fetchRepositories(req.body)
    res.status(200).json({ repositories })
  })

  server.get('/projects/:cursor?', cache('30 minutes'), async (req, res) => {
    return app.render(req, res, '/projects', {})
  })

  server.get('/page/:page', cache('30 minutes'), async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', { params: req.params, ...props })
  })

  server.get('/', async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', props)
  })

  server.get('/:slug', cache('30 minutes'), async (req, res, next) => {
    const slug = req.params.slug
    if (slug === 'favicon.ico') {
      return res.status(204).json({})
    }
    if (slug === 'about') {
      return next()
    }
    const props = await fetchPost(req, res)
    return app.render(req, res, '/post', { params: req.params, ...props })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})