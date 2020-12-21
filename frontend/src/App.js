import './App.css'
import THEMES from './common/themes.js'
import ChessGame from './components/ChessGame'

function App () {
  return (
    <div className='App'>
      <header className='App-header' style={{ backgroundColor: THEMES.dark.mainBackground }}>
        <ChessGame />
      </header>
    </div>
  )
}

export default App
