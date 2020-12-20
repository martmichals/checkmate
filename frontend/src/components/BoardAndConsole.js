import React from 'react'
import './BoardAndConsole.css'

// Chessboard and terminal imports
import ChessboardJs from 'react-chessboardjs-wrapper'
import Terminal from 'react-console-emulator'

class BoardAndConsole extends React.Component {
    constructor(props) {
        super(props)
        this.terminal = React.createRef()
    }

    componentDidMount() {
        // TODO : Remove this function
        const terminal = this.terminal.current
        this.interval = setInterval(() => {
            terminal.pushToStdout('Hello')
            terminal.scrollToBottom()
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="boardAndConsole">
                <ChessboardJs
                    animate // boolean, chessboard.js piece animations
                    whiteSquareColour="#9C9C9A" // or hex
                    blackSquareColour="#787675" // or hex
                    config={{
                    draggable: true,
                    showNotation: false,
                    pieceTheme: 'img/chesspieces/alpha/{piece}.png',
                    position: 'start'
                    }}
                    resize // effective if width prop is a string
                    width="550px" // string (%) || number (px)
                />
                <Terminal
                    welcomeMessage={"I'm Checkmate, a chess A.I."}
                    ref={this.terminal}
                    commands={{}}
                    style={{ 
                        width: '300px',
                        maxHeight: "550px",
                        backgroundColor: '#42403E'
                    }}
                    readOnly
                />
            </div>
        );
    }
}

export default BoardAndConsole