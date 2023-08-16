import {Header} from './components';
import { Home, History, Log, Login, Game } from './pages';

import './App.css';


function App() {
  return ( 
    <>
      <Header /> 
      <main className='main'>
        {/* <Home /> */}
        <Login />
      </main>
    </>
  )
}

export default App;
