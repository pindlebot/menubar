import React from 'react'
import { Link } from 'gatsby'
import { Breadcrumbs, Typography, AppBar, Toolbar, Container, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'

const prism = {
  'code[class*=language-],pre[class*=language-],pre[class*=language-] code': {
    color: '#1a202c !important',
    fontFamily: 'Roboto Mono, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    fontVariant: 'no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual',
    fontSize: 14,
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: 1.5,
    tabSize: 4,
    hyphens: 'none',
    borderRadius: 8,
    width: '100%',
    overflow: 'auto'
  },
  'pre[class*=language-]': {
    padding: '1em 0',
    margin: 0,
    overflow: 'auto'
  },
  ':not(pre) > code[class*=language-],pre[class*=language-]': {
	  background: '#f6f8fa !important'
  },
  ':not(pre) > code[class*=language-]': {
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal'
  },
  'code.inline-code, inlinecode': {
	  display: 'inline',
    verticalAlign: 'baseline',
    padding: '.05em .3em .2em',
    background: '#f6f8fa',
    fontSize: '14px',
    fontFeatureSettings: '"clig" 0, "calt" 0',
    fontVariant: 'no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual',
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    lineHeight: '24px',
    borderRadius: '5px',
    color: '#1a202c',
    fontWeight: 500
  },
  inlinecode: {
    backgroundColor: '#e2e8f0'
  },
  '.top-section h1 inlinecode': {
    fontSize: '2rem'
  },
  '.token.cdata,.token.comment,.token.doctype,.token.prolog': {
    color: '#718096 !important',
    fontStyle: 'normal !important'
  },
  '.token.namespace': {
    opacity: '.7'
  },
  '.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag,.token.type-args': {
    color: '#dd6b21 !important'
  },
  '.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string': {
    color: '#690 !important'
  },
  '.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url': {
    color: '#9a6e3a !important'
  },
  '.token.atrule,.token.attr-value,.token.keyword': {
    color: '#d5408c !important'
  },
  '.token.boolean,.token.class-name,.token.function,.token[class*=class-name]': {
    color: '#805ad5 !important'
  },
  '.token.important,.token.regex,.token.variable': {
    color: '#e90 !important'
  },
  '.token.bold,.token.important': {
    fontWeight: 700
  },
  '.token.italic': {
    fontStyle: 'italic'
  },
  '.token.entity': {
    cursor: 'help'
  },
  '.token.annotation': {
    color: '#319795 !important'
  }
}

const useStyles = makeStyles(theme => ({
  brand: {
    flexGrow: 1,
    '& > a': {
      color: '#A0AEC0'
    }
  },
  breadcrumbs: {
    marginBottom: 20
  },
  appBar: {
    backgroundImage: 'linear-gradient(180deg,#1a202c 0%,#2d3646 100%)',
    boxShadow: 'none'
  },
  container: {
    // @ts-ignore
    paddingTop: 24
  }
}))

const variables = {
  primaryColor: '#15bd76',
  secondaryColor: '#3182ce'
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: variables.primaryColor
    },
    secondary: {
      main: variables.secondaryColor
    },
    text: {
      primary: '#1a202c',
      secondary: '#3d556b',
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'rgb(247, 250, 252)'
        },
        img: {
          maxWidth: '660px'
        },
        pre: {
          backgroundColor: '#f6f8fa',
          padding: 20,
          borderRadius: 8
        },
        a: {
          color: '#3182ce',
          textDecoration: 'none',
          '&:visited': {
            color: '#3182ce',
          }
        },
        ':not(pre) > code': {
          color: 'rgb(26, 32, 44)',
          backgroundColor: 'rgb(237, 242, 247)',
          padding: '0.05em 0.3em 0.2em'
        },
        ...prism
      }
    }
  }
})

function Layout (props) {
  const classes = useStyles(props)
  const { children } = props
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' className={classes.appBar}>
        <Toolbar variant='dense'>
          <Typography className={classes.brand}>
            <Link to='/'>MenuBar</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container} maxWidth="md">
        {children}
      </Container>
    </MuiThemeProvider>
  )
}

export default Layout
