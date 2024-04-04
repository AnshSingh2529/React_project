import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import AddPosts from './Pages/AddPosts.jsx'
import AllPosts from './Pages/AllPosts.jsx';
import EditPost from './Pages/EditPost.jsx';
import HomePage from './Pages/HomePage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import PostPage from './Pages/PostPage.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './component/AuthLayout.jsx';
import LoginPage from './Pages/LoginPage.jsx';


const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout  authentication = {false}>
                    <LoginPage />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUpPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: (
            <AuthLayout authentication>
                <PostPage />
            </AuthLayout>
            ),
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
   <RouterProvider  router={router}/>
   </Provider>
  </React.StrictMode>,
)
