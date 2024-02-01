import { useState } from 'react'
import reactLogo from '@/assets/img/react.svg'

function App() {
    const [count, setCount] = useState(0)
    const [backednResult, setResult] = useState('Please click button...')
  
    const fetchWeatherForecast = () => {
      fetch('/api/Sample/GetWeathers')
        .then((resp) => resp.json())
        .then((json) => {
          setResult(JSON.stringify(json))
          console.log(json)
        })
    }
  
    const fetchMessage = () => {
      fetch('/api/WeatherForecast/GetBackendMessage')
        .then((resp) => resp.text())
        .then((msg) => setResult(msg))
    }
  
    return (
      <div className="section">
        <div className="container">
          <div className="box container-box">
            <div className="columns form-columns">
              <div className="column">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                  <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                  <img src={reactLogo} className="motion-safe:animate-logo-turn logo react" alt="React logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <div>
            <button onClick={() => fetchMessage()}>Fetch Message from backend</button>
            <button onClick={() => setCount((itcount) => itcount + 1)}>count is {count}</button>
            <button onClick={() => fetchWeatherForecast()}>Fetch Weather Forecast from backend</button>
          </div>
          <code>{backednResult}</code>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    )
  }
  
  export default App
  