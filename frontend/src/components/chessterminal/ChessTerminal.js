import React from 'react'

// Styling
import '../../common/themes.css'
import THEMES from '../../common/themes.js'

// Chessboard and terminal imports
import Terminal from 'react-console-emulator'

class ChessTerminal extends React.Component {
  constructor (props) {
    super(props)

    this.terminal = React.createRef()
    this.out = []
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const linesToPush = this.props.output.slice(this.out.length)
    linesToPush.forEach(line => {
      this.terminal.current.pushToStdout(line)
      // this.terminal.current.scrollToBottom()
    })
    this.out = this.out.concat(linesToPush)
  }

  render () {
    return (
      <div className='boardTerminalContainer' theme='dark'>
        <Terminal
          welcomeMessage={["I'm Checkmate, a chess A.I"]}
          ref={this.terminal}
          commands={{}}
          style={{
            width: '300px',
            height: '500px',
            textAlign: 'left',
            backgroundColor: THEMES.dark.terminal
          }}
          readOnly
        />
      </div>
    )
  }
}

export default ChessTerminal
