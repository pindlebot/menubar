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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.6/antd.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.0.0/trix.css" />
          <style dangerouslySetInnerHTML={{
            __html: `
              body {
                line-height: 1.6;
                font-size: 16px;
                margin: 0;
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
              }
              .main {
                background-color: #fff;
                padding: 24px;
                min-height: calc(100vh - 173px);
              }
              .trix-button-group--history-tools {
                display: none !important;
              }
              .ant-modal-body {
                min-height: 255px;
              }
              .cross-fade-leave {
                opacity: 1;
              }
              .cross-fade-leave.cross-fade-leave-active {
                opacity: 0;
                transition: opacity 1s ease-in;
              }
              
              .cross-fade-enter {
                opacity: 0;
              }
              .cross-fade-enter.cross-fade-enter-active {
                opacity: 1;
                transition: opacity 1s ease-in;
              }
              
              .cross-fade-height {
                transition: height .5s ease-in-out;
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