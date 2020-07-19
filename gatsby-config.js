require('dotenv').config()
const path = require('path')
const { buildClientSchema } = require('graphql')

module.exports = {
  pathPrefix: '/',

  siteMetadata: {
    pathPrefix: '/',
    titleAlt: 'Menubar.io',
    title: `Menubar`,
    logo: '',
    favicon: '',
    shortName: 'Menubar',
    description: ``,
    author: `@unshift`,
    siteUrl: 'https://menubar.io',
    banner: '',
    headline: 'Menubar',
    siteLanguage: 'en',
    ogLanguage: 'en_US',
    author: 'Ben Gardner'
  },
  plugins: [
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src`),
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `cms`,
        url: process.env.GRAPHQL_ENDPOINT,
        typeName: `ContentKit`,
        refetchInterval: 60,
        createSchema: async () => {
          const schema = require('./schema.json')
          return buildClientSchema(schema)
        },
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
        }
      },
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-material-ui',
    // {
    //   resolve: 'gatsby-plugin-fathom',
    //   options: {
    //     // Fathom server URL. Defaults to `cdn.usefathom.com`
    //     trackingUrl: 'fathom.k8s.menubar.io',
    //     // Unique site id
    //     siteId: 'TJAWN',
    //     // Domain whitelist
    //     whitelistHostnames: [
    //       'https://menubar.io',
    //       'http://menubar.io',
    //       'https://wwww.menubar.io'
    //     ]
    //   }
    // }
  ],
}
