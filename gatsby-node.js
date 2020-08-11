require('dotenv').config()
const path = require('path')
const format = require('date-fns/format')

const dateFormat = 'MMMM d, yyyy'
const CONTACT_API_ENDPOINT = 'https://contact.menubar.io'

const transform = node => {
  const { encoded_html, ...rest } = node
  return {
    ...rest,
    date: format(new Date(node.published_at || node.created_at), dateFormat),
    html: Buffer.from(encoded_html, 'base64').toString('utf8'),
    avatar: node.image ? `https://s3.amazonaws.com/contentkit/${node.image.url}` : null
  }
}

const getSearchData = (nodes) => {
  return nodes.map(({ slug, title, id, image, published_at, created_at }) => ({
    id,
    title,
    slug: `/${slug}`,
    avatar: image ? `https://s3.amazonaws.com/contentkit/${image.url}` : null,
    date: format(new Date(published_at || created_at), dateFormat)
  }))
}


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
  const posts = nodes.map(transform)
  const searchData = getSearchData(nodes)

  actions.createPage({
    path: '/',
    component: path.resolve(`./src/templates/Page.tsx`),
    context: {
      searchData,
      page: 0,
      offset: 0,
      total: count,
      nodes: posts.slice(0, 5),
    }
  })
  new Array(Math.ceil(count / 5)).fill(0).forEach((_, i) => {
    const page = i + 1
    const offset = page * 5
    actions.createPage({
      path: `/page/${page}`,
      component: path.resolve(`./src/templates/Page.tsx`),
      context: {
        searchData,
        page: page,
        offset: offset,
        total: count,
        nodes: posts.slice(offset, offset + 5)
      }
    })
  })

  posts.forEach(node => {
    actions.createPage({
      path: `/${node.slug}`,
      component: path.resolve(`./src/components/Post.tsx`),
      context: {
        searchData,
        post: node
      }
    })
  })

  actions.createPage({
    path: '/about',
    component: path.resolve('./src/templates/About.tsx'),
    context: {
      searchData,
      endpoints: {
        contactApiEndpoint: CONTACT_API_ENDPOINT
      }
    }
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