import React from 'react'
import Link from 'next/link'
import { Card, Avatar, Breadcrumb } from 'antd'
import Layout from '../components/Layout'
import styles from '../styles/post.scss'
import Breadcrumbs from '../components/Breadcrumbs'

class App extends React.Component {
  static defaultProps = {
    post: {}
  }
  render () {
    const { post } = this.props
    return (
      <Layout>
        <div>
          <Breadcrumbs
            items={[{
              name: 'Home',
              path: '/'
            }, {
              name: post.title,
              path: post.slug
            }]}
          />
        </div>
        <div className={styles.main}>
          <h2>{post.title}</h2>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Layout>
    )
  }
}

export default App

