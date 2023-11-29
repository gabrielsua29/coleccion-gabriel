import './App.css';
import Login from './components/login';
import Home from './components/home';
import Informes from './components/informes';
import Examen from './components/examen';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
  path: '/',
  children: [
  {
  index: true,
  element: <Login />
  },
  {
  path: 'home',
  element: <Home />
  },
  {
   path:'informes',
   element: <Informes /> 
  },
  {
   path:'examen',
   element: <Examen /> 
  }]
  }
])

function App() {
  return (
    <RouterProvider router = {router}/>
  );
}

export default App;
// Ernesto Gabriel Suárez Barrera