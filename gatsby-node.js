require('dotenv').config()
const path = require('path')
const fs = require('fs')
const format = require('date-fns/format')

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      cms {
        posts_aggregate(
          where: {
            project_id: {
              _eq: "${process.env.PROJECT_ID}"
            }
          }
          order_by: {
            published_at: desc_nulls_last
          }
        ) {
          aggregate {
            count
          }
          nodes {
            id
            title
            slug
            published_at
            created_at
            encoded_html
            created_at
            excerpt
            image {
              id
              url
            }
            posts_tags {
              tag {
                id
                name
              }
            }
          }
        }
      }
    }
  `)

  const { cms: { posts_aggregate: { nodes, aggregate: { count } } } } = data
  actions.createPage({
    path: '/',
    component: path.resolve(`./src/pages/index.tsx`),
    context: {
      page: 0,
      offset: 0,
      total: count
    }
  })
  const pages = new Array(Math.ceil(count / 5)).fill(0).forEach((_, i) => {
    const page = i + 1
    actions.createPage({
      path: `/page/${page}`,
      component: path.resolve(`./src/pages/index.tsx`),
      context: {
        page: page,
        offset: page * 5,
        total: count
      }
    })
  })
  nodes.forEach(node => {
    actions.createPage({
      path: `/${node.slug}`,
      component: path.resolve(`./src/components/Post.tsx`),
      context: {
        post: {
          ...node,
          date: format(new Date(node.published_at || node.created_at), 'MM/dd/yyyy'),
          html: Buffer.from(node.encoded_html, 'base64').toString('utf8')
        }
      }
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/page/)) {
    page.matchPath = "/page/*"

    // Update the page.
    createPage(page)
  }
}