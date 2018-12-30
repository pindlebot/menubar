import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

import { Card, Avatar, Breadcrumb } from 'antd';

class App extends React.Component {
  static async getInitialProps (ctx) {
    return {}
  }

  render () {
    return (
      <Layout posts={[]}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link href={'/'}><a>Home</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link href={`/about`}><a>About</a></Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className={'main'}>
          <h2 className={'post-title'}>About</h2>
          <div>Coming soon.</div>
        </div>
      </Layout>
    )
  }
}

export default App

