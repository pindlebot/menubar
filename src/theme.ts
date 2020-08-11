import { createMuiTheme } from '@material-ui/core/styles'

const variables = {
  primaryColor: '#15bd76',
  secondaryColor: '#3182ce'
}

// const fontFamily = [
//   '-apple-system',
//   'BlinkMacSystemFont',
//   '"Segoe UI"',
//   'Roboto',
//   '"Helvetica Neue"',
//   'Arial',
//   'sans-serif',
//   '"Apple Color Emoji"',
//   '"Segoe UI Emoji"',
//   '"Segoe UI Symbol"'
// ].join(',')

const fontFamily = `Open Sans, sans-serif`
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
    fontFamily
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontFamily: fontFamily
      }
    }
  }
})

export default theme
