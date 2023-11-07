import './App.css';
import Login from './components/login';
import Home from './components/home';
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