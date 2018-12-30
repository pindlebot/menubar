import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 }`}</style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.6/antd.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css" />
          <style dangerouslySetInnerHTML={{
            __html: `
              body {
                line-height: 1.6;
                font-size: 16px;
              }
              pre {
                padding: 10px;
                border: 1px solid #ebedf0;
                font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
                font-size: 12px;
              }
              img {
                max-width: 100%;
                margin-bottom: 1em;
              }
              .menubar-autocomplete input {
                background-color: #172A3C !important;
                border: none !important;
                border-radius: 0 !important;
              }
              .menubar-autocomplete .ant-input-suffix i {
                color: #fff;
              }
              .post-title {
                margin-left: 5px;
              }
              .main {
                background-color: #fff;
                padding: 24px;
                min-height: calc(100vh - 173px);
              }
            `
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}