import { Routes, Route, Navigate } from 'react-router-dom';
import {Header} from './components';
import { Home, History, Log, Login, Game } from './pages';

import style from './App.module.css';


function App() {
  return ( 
    <>
      <Header /> 
      <main className={style.main}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='game' element={<Game/>}/>
          <Route path='games' element={<History/>}/>
          <Route path='games/:gameId' element={<Log/>}/>
          <Route path='*' element={<Navigate to="/" replace/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App;
