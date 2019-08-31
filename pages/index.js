import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../components/Layout'
import styles from './index.scss'
import PostCard from '../components/PostCard'

const pages = [1,2,3,4,5]

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
    const { posts, prev, next } = this.props
    return (
      <Layout>
        <div className={styles.grid}>
          {posts.map(post => (
            <PostCard {...post} key={post.id} />
          ))}
        </div>
        <div className={styles.pagination}>
          <button onClick={evt => this.handlePageChange(prev)}>Prev</button>
          <button onClick={evt => this.handlePageChange(next)}>Next</button>
        </div>
      </Layout>
    )
  }
}

export default App
