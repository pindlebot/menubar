require('dotenv').config()
const express = require('express')
const next = require('next')
const fetch = require('node-fetch')
const unescape = require('lodash.unescape')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: require('./next.config.js') })
const bodyParser = require('body-parser')
const handle = app.getRequestHandler()

const PAGE_SIZE = 10
const BASE_URI = 'https://menubar.io/'
const { PROJECT_ID, TOKEN } = process.env
let cache = new Map()

const createFetch = async ({ query, variables }) => {
  if (!cache.has(query)) {
    let url = 'http://api.contentkit.co/graphql'
    let body = JSON.stringify({
      operationName: null,
      query: query,
      variables: variables || {}
    })
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-type': 'application/json',
      },
      body: body
    })
    const json = await resp.json()
    cache.set(query, json)
  }
 
  return Promise.resolve(cache.get(query))   
}

const fetchPage = (req, res) => {
  let params = req.params || {}
  let page = parseInt(params.page || 0)
  let offset = page * 10
  return createFetch({
    query: `{
      feed(limit: 10, offset: ${offset}, projectId: "${PROJECT_ID}") {
        count
        posts {
          id,
          title
          slug
          publishedAt
          createdAt
          excerpt
        }
      }
    }`
  })
    .then(({ data }) => {
      let next = page + 1
      let prev = Math.max(1, page - 1)
      let props = {}
      props.posts = data.feed.posts
      props.page = page
      props.next = next
      props.prev = prev
      props.meta = {}
      props.meta.canonical = `${BASE_URI}${page}`
      return props
    })
}

const fetchPost = (req, res) => {
  const { slug } = req.params
  return createFetch({
    query: `{
      post(slug: "${slug}", projectId: "${PROJECT_ID}") {
        id,
        title
        slug
        publishedAt
        createdAt
        excerpt
        document {
          html
        }
      }
    }`
  })
    .then(({ data }) => {
      data.post.document.html = unescape(data.post.document.html)
      data.posts = [data.post]
      data.meta = {}
      data.meta.canonical = `${BASE_URI}${slug}`
      data.meta.title = data.post.title
      data.meta.excerpt = data.post.excerpt
      return data
    })
}

app.prepare().then(() => {
  const server = express()
  server.get('/invalidate', (req, res) => {
    cache = new Map()
    res.status(200).json({
      invalidated: true
    })
  })
  server.post('/search', bodyParser.json(), async (req, res) => {
    const body = req.body;
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

  server.get('/page/:page', async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', { params: req.params, ...props })
  })

  server.get('/:slug', async (req, res, next) => {
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

  server.get('/', async (req, res) => {
    const props = await fetchPage(req, res)
    return app.render(req, res, '/', props)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})