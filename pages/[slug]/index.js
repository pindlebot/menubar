import React from 'react'
import Link from 'next/link'
import { Card, Avatar, Breadcrumb } from 'antd';
import Layout from '../../components/Layout'
import styles from '../../styles/post.scss'

class App extends React.Component {
  static defaultProps = {
    post: {}
  }
  render () {
    const { post } = this.props
    return (
      <Layout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <a href={'/'}>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={`/${post.slug}`}><a>{post.title}</a></Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.main}>
          <h2>{post.title}</h2>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Layout>
    )
  }
}

export default App

