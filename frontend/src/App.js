import './App.css';
import Login from './components/login';
import Home from './components/home';
import Informes from './components/informes';
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