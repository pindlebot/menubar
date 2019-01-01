// next.config.js
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  distDir: 'dist',
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
})