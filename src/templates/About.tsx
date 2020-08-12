import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/styles'
import { Description, GitHub, Mail, LinkedIn } from '@material-ui/icons'
import clsx from 'clsx'
import profile from '../images/profile.jpeg'
import ContactDialog from '../components/ContactDialog'
import { SnackbarProvider } from 'notistack'

export enum TileType {
  ACCOUNT = 'account'
}

const tiles = [
  {
    type: TileType.ACCOUNT,
    uri: 'https://github.com/unshift',
    primary: '@unshift',
    secondary: 'personal',
    icon: <GitHub />
  },
  {
    type: TileType.ACCOUNT,
    uri: 'https://github.com/scrollbars',
    primary: '@scrollbars',
    secondary: 'work',
    icon: <GitHub />
  },
  {
    type: TileType.ACCOUNT,
    uri: 'https://www.linkedin.com/in/gardnerbenjamin/',
    primary: '@gardnerbenjamin',
    secondary: null,
    icon: <LinkedIn />
  }
]

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 30
  },
  subheader: {
    color: '#718096'
  },
  container: {
    margin: '0 auto',
    marginBottom: 30,
    maxWidth: 980
  },
  paper: {
    boxShadow:
      'rgba(47, 55, 71, 0.05) 0px 4px 8px, rgba(47, 55, 71, 0.1) 0px 1px 3px',
    padding: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    width: '100%',
    height: '100%'
  },
  avatar: {
    width: 175,
    height: 175,
    marginBottom: 32
  },
  tile: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%'
  },
  divider: {
    width: '100%',
    height: 2
  },
  link: {
    fontSize: 14
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

function About(props) {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles(props)
  const {
    pageContext
  } = props
  const searchData = pageContext?.searchData || []
  const endpoints = pageContext?.endpoints || {}

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  return (
    <SnackbarProvider>
      <Layout searchData={searchData}>
        <ContactDialog open={open} onClose={onClose} contactApiEndpoint={endpoints?.contactApiEndpoint} />
        <Grid container spacing={3}>
          <Grid container item xs={8} direction="column">
            <Paper className={classes.paper}>
              <Typography variant="h1" className={classes.title} gutterBottom>
                Ben Gardner
              </Typography>
              <Typography variant='body1' gutterBottom>
                I'm a full-stack software engineer at Deloitte. 
              </Typography>
              <Typography variant='body1' gutterBottom>
                I built my first website when I was 12 with Geocities and have been passionate about web development ever since.
                I studied classics and philosophy at St. John's College and did a stint at the David Geffen School of Medicine at UCLA before pivoting to Software Engineering.
              </Typography>

              <Typography variant='body1' gutterBottom>
                At Deloitte, I'm working on an internal project that relies heavily on Cassandra, ElasticSearch, Java, Node.Js, and Kubernetes.
                The front-end stack is comprised of React, Redux, GraphQL (Apollo), and Typescript.
              </Typography>     
            </Paper>
          </Grid>
          <Grid container item xs={4} direction="column" alignItems="center">
            <Paper className={clsx(classes.paper, classes.flex)}>
              <Avatar src={profile} className={classes.avatar} />
              <Divider className={classes.divider} />
              <List className={classes.list}>
                {tiles.map(tile => {
                  return (
                    <ListItem button>
                      <ListItemIcon>{tile.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <a href={tile.uri} className={classes.link}>
                            {tile.primary}
                          </a>
                        }
                        secondary={tile.secondary}
                      />
                    </ListItem>
                  )
                })}
              </List>
              <Divider className={classes.divider} />
              <List className={classes.list}>
                <ListItem button onClick={onOpen}>
                  <ListItemIcon>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText
                    primary={'Contact Me'}
                    classes={{ primary: classes.link }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Description /></ListItemIcon>
                  <ListItemText primary={(
                    <a className={classes.link} href={'https://menubar-static.s3.amazonaws.com/resume.pdf'}>Resume</a>
                  )} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </SnackbarProvider>
  )
}

About.defaultProps = {
  pageContext: {}
}

export default About
