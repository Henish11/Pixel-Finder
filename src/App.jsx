import './App.scss'
import Header from './component/Header/Header'
import Home from './pages/Home/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Search from './pages/Search/Search'

function App() {

  return (
    <BrowserRouter>
       <Header/>
       <Routes>
         <Route path='/' element={ <Home/> } />
         <Route path='/photos/:query' element={ <Search/> } />
       </Routes>
    </BrowserRouter>
  )
}

export default App
