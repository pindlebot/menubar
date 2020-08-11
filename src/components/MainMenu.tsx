import React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'gatsby'

const useStyles = makeStyles(theme => ({
  menu: {
    color: '#A0AEC0'
  }
}))

function MainMenu (props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles(props)
  const onClick = evt => {
    setAnchorEl(evt.target)
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton className={classes.menu} onClick={onClick}>
        <MoreVert />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
        <MenuItem>
          <Link to='/about'>
            About Me
          </Link>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MainMenu