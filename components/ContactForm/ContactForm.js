import React from 'react'
import Form from 'antd/lib/form'
import Editor from '../Editor'
import Input from 'antd/lib/input'

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

export default ContactForm
