import React from 'react'
import { Link } from 'gatsby'
import { Avatar, Fade, Divider, ListItem, ListItemText, List, Popper, Input, Paper, Typography, ListItemAvatar } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles' 

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    width: 200,
    backgroundColor: '#384357',
    padding: '4px 12px',
    borderRadius: 4
  },
  input: {
    padding: '6px 7px'
  },
  paper: {
    width: 400,
    maxHeight: 600,
    overflowY: 'auto',
    backgroundColor: '#fff'
  },
  primary: {
    fontSize: 14,
    '& a': {
      color: '#1a202c'
    }
  },
  avatar: {
    width: 30,
    height: 30
  },
  icon: {
    color: '#A0AEC0'
  },
  secondary: {
    color: '#718096',
    fontSize: 12
  }
}))

function Search (props) {
  const classes = useStyles(props)
  const { options } = props
  const [value, setValue] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [focus, setFocus] = React.useState(false)
  const inputRef = React.useRef(null)

  const onClose = () => {
    setAnchorEl(null)
  }
  const onChange = evt => {
    setValue(evt.target.value)
  }

  const onOpen = () => {
    setAnchorEl(inputRef.current)
  }

  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const results = React.useMemo(() => {
    if (!value) {
      return []
    }
    return [...options.filter(option => {
      return option.title.toLowerCase().includes(value.toLowerCase())
    })].sort()
  }, [value])

  React.useEffect(() => {
    if (anchorEl && !focus) {
      onClose()
    }
  }, [focus, anchorEl])

  React.useEffect(() => {
    if (!anchorEl && focus && value) {
      onOpen()
    }
  }, [focus, anchorEl, value])

  return (
    <>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <Fade in={Boolean(anchorEl)} timeout={500}>
          <Paper className={classes.paper}>
            <List>
              {results.map((option, index) => {
                return (
                  <>
                    <ListItem onMouseDown={evt => evt.preventDefault()} tabIndex={index} component='li'>
                      <ListItemAvatar>
                        <Avatar src={option.avatar} className={classes.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={(
                          <Typography className={classes.primary}>
                            <Link to={option.slug}>
                              {option.title}
                            </Link>
                          </Typography>
                        )}
                        secondary={(
                          <Typography className={classes.secondary}>
                            {option.date}
                          </Typography>
                        )}
                        disableTypography
                      />
                    </ListItem>
                    <Divider />
                  </>
                )
              })}
            </List>
          </Paper>
        </Fade>

      </Popper>
      <Input
        margin='none'
        fullWidth
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        classes={{
          root: classes.root,
          input: classes.input
        }}
        disableUnderline
        startAdornment={(
          <SearchIcon className={classes.icon} />
        )}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  )
}

Search.defaultProps = {
  options: []
}

export default Search