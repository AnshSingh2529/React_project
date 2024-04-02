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
import Protected from './component/Protected.jsx';

import LoginForm from './Forms/LoginForm.jsx'


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
                <Protected  authentication={false}>
                    <LoginForm />
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
