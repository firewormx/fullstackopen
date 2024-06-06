import ReactDOM from 'react-dom/client'
import { CounterContextProvider } from './CounterContext'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<CounterContextProvider>
  <App />
  </CounterContextProvider>)
}
renderApp()