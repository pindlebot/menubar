import React from 'react'
import { Link, graphql } from 'gatsby'
import { Collapse, Typography, Avatar, IconButton, Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/styles'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 24,
    boxShadow: '0px 4px 8px rgba(60,45,111,0.1), 0px 1px 3px rgba(60,45,111,0.15)',
    padding: 20
  },
  title: {
    fontSize: 20,
    '& > a': {
      color: '#3182c',
      textDecoration: 'none'
    }
  },
  subheader: {
    color: '#718096'
  }
}))

function Entry (props) {
  const [expanded, setExpaded] = React.useState(false)
  const classes = useStyles(props)
  const { id, image, title, slug, published_at, excerpt } = props

  const toggleExpand = () => setExpaded(exp => !exp)
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar src={`https://s3.amazonaws.com/contentkit/${image.url}`} />
        )}
        title={(
          <Typography variant='h3' className={classes.title}> 
            <Link to={`/${slug}`}>{title}</Link>
          </Typography>
        )}
        subheader={(
          <Typography variant='subtitle1' className={classes.subheader}>
            {published_at}
          </Typography>
        )}
        action={
          <IconButton aria-label="settings" onClick={toggleExpand}>
            <MoreVert />
          </IconButton>
        }
        disableTypography
      />
      <Collapse in={expanded}>
        <CardContent>
          {excerpt}
        </CardContent>
      </Collapse>
    </Card>
  )
}

function Index (props) {
  const { data, pageContext: { page } } = props
  const posts = data?.cms?.posts_aggregate.nodes || []
  return (
    <Layout>
      {
        posts.map(post => <Entry key={post.id} {...post} />)
      }
      <Pagination
        page={page}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/page/${item.page}`}
            {...item}
          />
        )}
      />
    </Layout>
  )
}

export const query = graphql`
  query($offset: Int) {
    cms {
      posts_aggregate(
        where: {
          project_id: {
            _eq: "cjepisl57j98v0199y8k65bb8"
          }
        }
        order_by: {
          published_at: desc_nulls_last
        }
        limit: 5,
        offset: $offset
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
`


export default Index


