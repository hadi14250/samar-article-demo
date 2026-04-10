import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', backgroundColor: '#141717', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ maxWidth: 500, textAlign: 'center' }}>
            <h1 style={{ color: '#e5b981', fontFamily: 'Quicksand, sans-serif', marginBottom: '1rem' }}>Something went wrong</h1>
            <pre style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto' }}>
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
