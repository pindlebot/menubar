require('dotenv').config()
const path = require('path')
const fetch = require('node-fetch')
const createHttpLink = require('apollo-link-http').createHttpLink
const fs = require('fs')
const { buildSchema, buildClientSchema } = require('graphql')

module.exports = {
  siteMetadata: {
    title: `Menubar`,
    description: ``,
    author: `@unshift`,
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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
    // `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
