import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import AddPosts from './component/Pages/AddPosts.jsx';
import AllPosts from './component/Pages/AllPosts.jsx';
import EditPost from './component/Pages/EditPost.jsx';
import HomePage from './component/Pages/HomePage.jsx';
import LoginPage from './component/Pages/LoginPage.jsx';
import SignUpPage from './component/Pages/SignUpPage.jsx';
import PostPage from './component/Pages/PostPage.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';



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
                <Protected authentication={false}>
                    <LoginPage />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <SignUpPage />
                </Protected>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected authentication>
                    {" "}
                    <AllPosts />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AddPosts />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <PostPage />,
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
