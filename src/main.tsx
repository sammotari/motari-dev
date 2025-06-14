import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { UserProvider } from './context/UserContext'

// Layout
import Layout from './components/Layout'

// Pages
import App from './App'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserPanel from './pages/UserPanel'
import CreatePost from './components/CreatePost'
import EditPost from './pages/user/posts/EditPost'
import PostList from './components/PostList'
import PostDetail from './pages/user/posts/PostDetail'
import ModerateComments from './pages/user/posts/ModerateComments'
import ProjectList from './pages/user/projects/index'
import NewProject from './pages/user/projects/new'
import EditProject from './pages/user/projects/edit/[id]'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 👈 Wrap with layout
    children: [
      { path: '/', element: <App /> },
      { path: '/posts/:slug', element: <PostDetail /> },
      { path: '/user', element: <UserPanel /> },
      { path: '/user/posts', element: <PostList /> },
      { path: '/user/posts/new', element: <CreatePost /> },
      { path: '/user/posts/edit/:id', element: <EditPost /> },
      { path: '/user/comments', element: <ModerateComments /> },
      { path: '/user/projects', element: <ProjectList /> },
      { path: '/user/projects/new', element: <NewProject /> },
      { path: '/user/projects/edit/:id', element: <EditProject /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
)
