import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Card from 'antd/lib/card'
import Avatar from 'antd/lib/avatar'
import Pagination from 'antd/lib/pagination'
import Layout from '../../components/Layout'
import styles from './styles.scss'
import Tag from 'antd/lib/tag'
import Button from 'antd/lib/button'
import PostCard from '../../components/PostCard'

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
    const { posts } = this.props
    return (
      <Layout>
        <div className={styles.grid}>
          {posts.map(post => (
            <PostCard {...post} key={post.id} />
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
