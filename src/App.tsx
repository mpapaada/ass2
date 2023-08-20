import { Routes, Route, Navigate } from 'react-router-dom';
import {Header, UserProvider, SizeProvider, TurnProvider} from './components';
import { Home, History, Log, Login, Game } from './pages';

import style from './App.module.css';


function App() {
  return ( 
    <UserProvider>
      <SizeProvider>
        <TurnProvider>
          <Header /> 
            <main className={style.main}>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='game' element={<Game/>}/>
                <Route path='games' element={<History/>}/>
                <Route path='game-log/:Id' element={<Log/>}/>
                <Route path='*' element={<Navigate to="/" replace/>}/>
              </Routes>
            </main>
        </TurnProvider>
      </SizeProvider>
    </UserProvider>
  )
}

export default App;
