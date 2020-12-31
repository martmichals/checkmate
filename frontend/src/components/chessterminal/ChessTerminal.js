import React from 'react'

// Styling
import '../../common/themes.css'
import THEMES from '../../common/themes.js'

// Chessboard and terminal imports
import Terminal from 'react-console-emulator'

class ChessTerminal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      out: props.output
    }
  }

  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <Terminal
          welcomeMessage={this.state.out}
          commands={{}}
          style={{
            width: '300px',
            maxHeight: '550px',
            backgroundColor: THEMES.dark.terminal
          }}
          readOnly
        />
      </div>
    )
  }
}

export default ChessTerminal
