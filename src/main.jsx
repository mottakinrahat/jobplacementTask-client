import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './component/Home/Home.jsx';
import Media from './component/Media/Media.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from './component/AuthProvider/AuthProvider';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import About from './component/About/About';
import DetailsPost from './component/DetailsPost/DetailsPost';
import Update from './component/Update/Update';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/media',
        element: <Media></Media>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path:'/details/:id',
       element:<DetailsPost></DetailsPost>,
       loader:({params})=>fetch(`http://localhost:5000/dataOfPost/${params.id}`)
      },
      {
        path:'/update/:id',
        element:<Update></Update>,
        loader:({params})=>fetch(`http://localhost:5000/userData/${params.id}`)
      }
    ]
  },
]);
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
