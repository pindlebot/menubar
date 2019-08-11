require('dotenv').config()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: require('../next.config.js') })
const bodyParser = require('body-parser')
const handle = app.getRequestHandler()

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

app.prepare().then(async () => {
  const server = express()
  server.get((req, res, next) => {
    if (req.url === '/favicon.ico') {
      return res.send('')
    }

    next()
  })

  server.post('/send', bodyParser.json(), async (req, res) => {
    const { body } = req
    await sendEmail(body)
    res.status(200).json({})
  })

  server.post('/search', bodyParser.json(), async (req, res) => {
    const body = req.body
    const data = await createFetch({
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

  server.post('/api/projects', bodyParser.json(), async (req, res) => {
    const repositories = await fetchRepositories(req.body)
    res.status(200).json({ repositories })
  })

  server.get('/projects/:cursor?', async (req, res) => {
    return app.render(req, res, '/projects', {})
  })

  server.get('/page/:page', async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', { params: req.params, ...props })
  })

  server.get('/', async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', props)
  })

  server.get('/:slug', async (req, res, next) => {
    console.log(req.params)

    const slug = req.params.slug
    if (slug === 'favicon.ico') {
      return res.status(204).json({})
    }
    if (slug === 'about') {
      return next()
    }
    const props = await fetchPost(req, res)
    console.log(props)
    return app.render(req, res, '/:slug', { params: req.params, ...props })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})