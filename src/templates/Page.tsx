import React from 'react'
import { Link } from 'gatsby'
import { Collapse, Typography, Avatar, IconButton, Card, CardHeader, CardContent } from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
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
  const { avatar, id, title, slug, date, excerpt } = props

  const toggleExpand = () => setExpaded(exp => !exp)

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar src={avatar} />
        )}
        title={(
          <Typography variant='h3' className={classes.title}> 
            <Link to={`/${slug}`}>{title}</Link>
          </Typography>
        )}
        subheader={(
          <Typography variant='subtitle1' className={classes.subheader}>
            {date}
          </Typography>
        )}
        action={
          <IconButton aria-label='settings' onClick={toggleExpand}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
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

function Page (props) {
  const { pageContext } = props
  const nodes = pageContext?.nodes || []
  const page = pageContext?.page || 1
  return (
    <Layout searchData={pageContext.searchData}>
      {
        nodes.map(post => <Entry key={post.id} {...post} />)
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

Page.defaultProps = {
  pageContext: {}
}

export default Page


