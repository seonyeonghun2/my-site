import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './routes/Home'
import Works from './routes/Works'
import Blog from './routes/Blog'
import ViewPost from './routes/ViewPost'
import ViewContact from './routes/ViewContact'
import Contact from './routes/Contact'
import Modify from './routes/Modify'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Main from './layouts/Main'
import WriteWorks from './components/WriteWorks'
import WriteBlog from './components/WriteBlog'
import WriteContact from './components/WriteContact'
import "./App.css"
function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}>
            <Route index element={<Main />} />
            <Route path='works' element={<Works />} />
            <Route path='works/write' element={<WriteWorks />} />
            <Route path='blog' element={<Blog />} />
            <Route path='blog/write' element={<WriteBlog />} />
            <Route path='/blog/post/:postId' element={<ViewPost />} />
            <Route path='contacts' element={<Contact />} />
            <Route path='contacts/write' element={<WriteContact />} />
            <Route path='/contacts/read/:contactId' element={<ViewContact />} />
        </Route>
        <Route path='/modify' element={<Modify />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App