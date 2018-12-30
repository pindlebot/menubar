import React from 'react'
import { Layout, Menu, Breadcrumb, Input, AutoComplete, Button, Icon } from 'antd';
import Router from 'next/router'
import Link from 'next/link'

class AppAutoComplete extends React.Component {
  state = {
    dataSource: [],
    focused: false
  }

  onSelect = slug => {
    Router.push(`/${slug}`)
  }

  handleSearch = async query => {
    if (query.length > 2) {
      let { data } = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ query })
      }).then(resp => resp.json())
      this.setState({
        dataSource: (data.feed.posts || []).map(post => <AutoComplete.Option key={post.slug}>{post.title}</AutoComplete.Option>)
      })
    }
  }

  filterOption = (inputValue, option) => {
    return true
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  render() {
    return(
      <AutoComplete
        dataSource={this.state.dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="search"
        filterOption={this.filterOption}
        defaultActiveFirstOption={false}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <Input
          className={this.state.focused ? '' : 'menubar-autocomplete'}
          suffix={(
            <Icon type="search" className="certain-category-icon" />
          )}
        />
      </AutoComplete>
    )
  }
}

class AppLayout extends React.Component {
  static defaultProps = {
    posts: []
  }

  render () {
    return (
      <Layout>
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' }}>
          <div className="logo" style={{color: '#fff', width: '40vw'}}>Menubar.io</div>
          <AppAutoComplete
            posts={this.props.posts}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '50px' }}
          >
            <Menu.Item key="1">
              <Link href={'/'}><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href={'/about'}><a>About</a></Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          {this.props.children}
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          🌵
        </Layout.Footer>
      </Layout>
    )
  }
}

export default AppLayout

