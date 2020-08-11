import React from 'react'
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import { useSnackbar } from 'notistack'

function ContactDialog (props) {
  const { enqueueSnackbar } = useSnackbar()
  const { open, onClose, contactApiEndpoint } = props
  const [state, setState] = React.useState({ email: '', message: '', subject: '' }) 
  
  const createHandler = key => evt => {
    setState({
      ...state,
      [key]: evt.target.value
    })
  }

  const onSend = async () => {
    const resp = await fetch(contactApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    await resp.json()
    onClose()
    enqueueSnackbar(
      'Sent!',
      {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom'
        }
      }
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Contact Ben
      </DialogTitle>
      <DialogContent>
        <TextField
          variant='outlined'
          margin='dense'
          label='Email'
          fullWidth
          value={state.email}
          onChange={createHandler('email')}
        />
        <TextField
          variant='outlined'
          margin='dense'
          label='Subject'
          fullWidth
          value={state.subject}
          onChange={createHandler('subject')}
        />
        <TextField
          variant='outlined'
          margin='dense'
          label='Message'
          multiline
          rows={12}
          fullWidth
          value={state.message}
          onChange={createHandler('message')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSend}>Send</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactDialog
