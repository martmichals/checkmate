import './App.css'
import THEMES from './common/themes.js'
import Interface from './components/interface/Interface'

function App () {
  return (
    <div className='App'>
      <header className='App-header' style={{ backgroundColor: THEMES.dark.mainBackground }}>
        <Interface />
      </header>
    </div>
  )
}

export default App
