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

import Editor from './Editor'
import AutoComplete from '../AutoComplete'

const ContactForm = props => {
  return (
    <Form>
      <Form.Item>
        {props.form.getFieldDecorator('name', {
          initialValue: '',
          rules: [{ required: true, message: 'Please input name' }]
        })(<Input placeholder={'Name'} />)}
      </Form.Item>
      <Form.Item>
        {props.form.getFieldDecorator('from', {
          initialValue: '',
          rules: [{ required: true, message: 'Please input email' }]
        })(<Input placeholder={'Email'} />)}
      </Form.Item>
      <Form.Item>
        {props.form.getFieldDecorator('message', {
          initialValue: '',
        })(<Editor />)}
      </Form.Item>
    </Form>
  )
}

class AppLayout extends React.Component {
  state = {
    visible: false,
    success: false
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
    return (
      <Layout style={{ height: '100%' }}>
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' }}>
          <div className="logo">
            <a href={'/'} style={{color: "#fff", marginRight: '15px'}}>Menubar.io</a>
            <AutoComplete />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{ lineHeight: '50px' }}
          >
            <Menu.Item key="/">
              <a href={'/'}>Home</a>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link href={'/about'}><a>About</a></Link>
            </Menu.Item>
            <Menu.Item key="/contact" onClick={this.handleClick}>
              <a>Contact</a>
            </Menu.Item>
            <Menu.Item key={'/projects'}>
              <Link href={'/projects'}>
                Projects
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a href={'https://github.com/unshift/menubar-next'}><Icon type="github" /></a>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          {this.props.children}
          <Modal
            title="Contact"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.hideModal}
            okText="Send"
            cancelText="Cancel"
          >
          <ReactCSSTransitionReplace
            transitionName="cross-fade" 
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            {this.state.success
              ? (<div key={'item1'}>Success!</div>)
              : (<ContactForm key={'item2'} form={this.props.form} />)
            }
          </ReactCSSTransitionReplace>
          </Modal>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          🌵
        </Layout.Footer>
      </Layout>
    )
  }
}

export default Form.create()(AppLayout)

