import React from 'react'

const convertToPlain = ({ blockList }) => {
  const { objects } = blockList
  let blocks = objects.reduce((a, c) => a.concat(c.text.pieceList.objects), [])
  console.log(blocks)
}

export default class Editor extends React.Component {
  ref = React.createRef()
  state = {
    loaded: false,
  }

  handleChange = (evt) => {
    if (this.props.onChange) {
      this.props.onChange(evt)
    }
  }

  async componentDidMount () {
    if (typeof window === 'undefined') return
    let module = await import('trix')
    this.setState({ loaded: true }, () => {
      let editor = this.ref.current.editorController.editor
      this.ref.current.addEventListener("trix-initialize", () => {
        this.ref.current.addEventListener('trix-change', this.handleChange, false);
      })
    })
  }

  componentWillUnmount () {    
    this.ref.current.removeEventListener('trix-change', this.handleChange)
  }

  render() {
    return (
      <React.Fragment>
        <input id="trix-input" type="hidden" name="content" style={{visibility: 'hidden'}} />
        <trix-editor id={'trix'} input="trix-input" ref={this.ref}></trix-editor>
      </React.Fragment>
    )
  }
}