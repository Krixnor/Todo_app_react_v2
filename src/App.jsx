import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Todo from './pages/Todo';
import Navbar from './components/Navbar';
import AuthProvider from './context/authContext';
import TodoProvider from './context/todoContext';


function App() {
  return (
    <AuthProvider>
      <TodoProvider>
   <div className='app'>
    <Navbar/>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/auth' element= {<Auth />}/>
      <Route path='/todo' element= {<Todo />}/>
      </Routes>
   </div>
   </TodoProvider>
   </AuthProvider>
  )
}

export default App
