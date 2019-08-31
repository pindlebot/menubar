import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/post.scss'
import Breadcrumbs from '../../components/Breadcrumbs'

class About extends React.Component {
  render () {
    return (
      <Layout>
        <Breadcrumbs
          items={[{
            name: 'Home',
            path: '/'
          }, {
            name: 'About',
            path: '/about'
          }]}
        />
        <div className={styles.main}>
          <h2>About</h2>
          <div>Coming soon.</div>
        </div>
      </Layout>
    )
  }
}

export default About

