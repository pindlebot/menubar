import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Pagination from 'antd/lib/pagination'
import Layout from '../components/Layout'
import Repo from '../components/Repo'
import 'isomorphic-fetch'
import debounce from 'lodash.debounce'

class Projects extends React.Component {
  static defaultProps = {
    repositories: {},
    page: 1,
    next: 2
  }

  handlePageChange = page => {
    const cursor = this.props.repositories.pageInfo.endCursor
    Router.push(`/projects/${cursor}`)
  }

  handleScroll = evt => {
    let atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight
    if (atBottom) {
      this.props.fetchMore(true)
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const repositories = this.props.repositories || {}
    return (
      <Layout>
        <div 
          className={'projects-grid'}
        >
          {(repositories.nodes || []).map(node => (
            <Repo {...node} key={node.id} loading={Boolean(node.loading)} />
          ))}
        </div>
      </Layout>
    )
  }
}

const createEmptyNodes = () => 
  new Array(10).fill({ loading: true }).map((x, i) => ({ ...x, id: i }))
 
export default class extends React.Component {
  state = {
    repositories: {
      nodes: [],
      pageInfo: {
        endCursor: null,
        startCursor: null,
        hasNextPage: true
      }
    }
  }

  componentDidMount () {
    this.fetchMore()
  }

  fetchMore = debounce(async (forward = true) => {
    if (!this.state.repositories.pageInfo.hasNextPage) return
    await new Promise((resolve, reject) => this.setState({
      repositories: {
        ...this.state.repositories,
        nodes: [...this.state.repositories.nodes].concat(createEmptyNodes())
      }
    }, resolve))

    const { repositories: { pageInfo } } = this.state
    let variables = forward
      ? { first: 9, after: pageInfo.endCursor }
      : { last: 9, before: pageInfo.startCursor }
    let { repositories } = await fetch('https://menubar.io/api/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(variables)
    }).then(resp => resp.json())
    
    repositories.nodes = [...this.state.repositories.nodes]
        .filter(({ loading }) => !loading).concat(repositories.nodes)
    
    this.setState({ repositories })
  }, 500)

  render () {
    return (
      <Projects
        {...this.props}
        repositories={this.state.repositories}
        fetchMore={this.fetchMore}
      />
    )
  }
}
