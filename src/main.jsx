import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/global.css'
import App from './App'
import Layout from './components/Layout'
import ErrorPage from './ErrorPage'
import { AppProvider } from './context/appContext'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <App/>,
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </React.StrictMode>,
)
