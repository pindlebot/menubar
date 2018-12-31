import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Card from 'antd/lib/card'
import Avatar from 'antd/lib/avatar'
import Pagination from 'antd/lib/pagination'
import Layout from '../components/Layout'

function formatDate (dateString) {
  if (!dateString) return ''
  const date = new Date(
    Date.parse(dateString)
  )
  return [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear()
  ].join('/')
}

const PostCard = ({ post }) => (
  <Card>
    <Card.Meta
      avatar={<Avatar src="https://avatars3.githubusercontent.com/u/19880087" />}
      title={
        <Link href={`/${post.slug}`}><a>{post.title}</a></Link>
      }
      description={formatDate(post.publishedAt)}
    />
  </Card>
)

class App extends React.Component {
  static defaultProps = {
    posts: [],
    page: 1,
    next: 2
  }

  handlePageChange = page => {
    Router.push(`/page/${page}`)
  }

  render () {
    const posts = this.props.posts || []
    return (
      <Layout>
        <div style={{display:'grid', gridTemplateColumns: 'repeat(2, calc(50vw - 60px))', gridGap: '20px', margin: '24px 0px' }}>
          {posts.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <Pagination
          defaultCurrent={1}
          pageSize={10}
          total={50}
          current={this.props.page || 1}
          onChange={this.handlePageChange}
        />
      </Layout>
    )
  }
}

export default App
