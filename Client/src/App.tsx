import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'



type User = {
  id: number;
  name: string;
};


function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])


  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data);
    console.log(response.data);
  };

useEffect(() => {
  fetchAPI();
},[])
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {
          array.map((allUsers) =>( 
            <div key={allUsers['id']}>
              <p>{allUsers['name']}</p>
              <br />
            </div>
          ))
        }
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
