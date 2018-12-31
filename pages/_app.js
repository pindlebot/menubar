import React from 'react'
import App, { Container } from 'next/app'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = ctx.query || {}

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