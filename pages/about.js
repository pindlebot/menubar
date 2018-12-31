import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Breadcrumb from 'antd/lib/breadcrumb'
import Card from 'antd/lib/card'
import Avatar from 'antd/lib/avatar'

class About extends React.Component {
  render () {
    return (
      <Layout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><a href={'/'}>Home</a></Breadcrumb.Item>
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

export default About

