import { graphql } from 'gatsby'
import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import Layout from './Layout'
import { makeStyles } from '@material-ui/styles'
import format from 'date-fns/format'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 30
  },
  subheader: {
    color: '#718096'
  },
  paper: {
    boxShadow: 'rgba(47, 55, 71, 0.05) 0px 4px 8px, rgba(47, 55, 71, 0.1) 0px 1px 3px',
    padding: 30,
    backgroundColor: '#fff',
    fontSize: 16,
    maxWidth: 980,
    margin: '0 auto'
  }
}))
function Post (props) {
  const classes = useStyles(props)
  const { pageContext: { post } } = props

  return (
    <Layout>
      <Paper className={classes.paper}>
        <Typography variant='h1' className={classes.title}>{post.title}</Typography>
        <Typography variant='subtitle1' className={classes.subheader}>
          {post.date}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Paper>
    </Layout>
  )
}


// export const query = graphql`
//   query($id: String!) {
//     cms {
//       posts(where: { id: { _eq: $id } }) {
//         id
//         title
//         slug
//         encoded_html
//         published_at
//         created_at
//       }
//     }
//   }
// `

export default Post