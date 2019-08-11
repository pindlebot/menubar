import React from 'react'
import NextApp, { Container } from 'next/app'
import '../styles/main.scss'

class App extends NextApp {
  static async getInitialProps ({ Component, router, ctx }) {
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

export default App
