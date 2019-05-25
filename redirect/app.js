const http = require('http')
const {
  PORT = 3000,
  REDIRECT_URL = 'https://menubar.io'
} = process.env

http.createServer((req, res) => {
  const url = `${REDIRECT_URL}${req.url}`
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Location', url)
  res.statusCode = 301
  res.end(`Redirecting to ${url}`)
}).listen(PORT)