import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Content from './Components/Content'
import { Provider } from 'react-redux'
import store from './state/store'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
     <Content></Content>
    </Provider>
  )
}

export default App
