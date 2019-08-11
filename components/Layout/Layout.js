import React from 'react'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Breadcrumb from 'antd/lib/breadcrumb'
import Router from 'next/router'
import Link from 'next/link'
import Popover from 'antd/lib/popover'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import 'isomorphic-fetch'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import Dropdown from 'antd/lib/dropdown'
import AutoComplete from '../AutoComplete'
import styles from './styles.scss'
import ContactForm from '../ContactForm'

const menuItems = [

]

const Bars = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="bars"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={24}
    height={24}
    style={{
      display: 'block',
      margin: '0 10px'
    }}
  >
    <path fill="#fff" d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"></path>
  </svg>
)

class AppLayout extends React.Component {
  state = {
    visible: false,
    success: false
  }

  componentDidMount () {
    window.fathom = window.fathom || function() {
      window.fathom.q = (window.fathom.q || [])
      window.fathom.q.push(arguments)
    }
    const script = document.createElement('script')
    script.src = '//fathom.contentkit.co/tracker.js'
    script.async = false
    script.id = 'fathom-script'
    document.head.appendChild(script)
    window.fathom('set', 'siteId', 'OLVFR')
    window.fathom('trackPageview')
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    let values = this.props.form.getFieldsValue()
    /*await fetch('/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(resp => resp.json())*/
    this.setState({
      success: true
    })
  }

  handleClick = evt => {
    this.setState({ visible: true, success: false })
  }

  hideModal = evt => {
    this.setState({ visible: false, success: false })
  }
  
  render () {
    let selectedKeys = typeof window !== 'undefined'
      ? [window.location.pathname]
      : []
    const menu = (
      <Menu>
        <Menu.Item key='/'>
          <a href={'/'}>Home</a>
        </Menu.Item>
        <Menu.Item key='/about'>
          <a href={'/about'}>About</a>
        </Menu.Item>
        <Menu.Item key='/contact' onClick={this.handleClick}>
          <a>Contact</a>
        </Menu.Item>
        <Menu.Item key={'/projects'}>
          <a href={'/projects'}>
            Projects
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href={'https://github.com/unshift/menubar-next'}>
            <Icon type='github' />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout className={styles.root}>
        <Layout.Header className={styles.header}>
          <div>
            <a href={'/'} className={styles.brand}>Menubar.io</a>
          </div>
          <div style={{ flexBasis: '30%', display: 'flex', flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center' }}>
            <AutoComplete />
            <Dropdown overlay={menu} trigger={['click']}>
              <a><Bars /></a>  
            </Dropdown>
          </div>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          {this.props.children}
          <Modal
            title='Contact'
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.hideModal}
            okText='Send'
            cancelText='Cancel'
          >
          <ReactCSSTransitionReplace
            transitionName='cross-fade' 
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            {this.state.success
              ? (<div key={'item1'}>Success!</div>)
              : (<ContactForm key={'item2'} form={this.props.form} />)
            }
          </ReactCSSTransitionReplace>
          </Modal>
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
          Menubar
        </Layout.Footer>
      </Layout>
    )
  }
}

export default Form.create()(AppLayout)

