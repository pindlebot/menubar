import React from 'react'
import App, { Container } from 'next/app'
import '../styles/main.scss'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = ctx.query || {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
  
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}