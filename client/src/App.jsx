import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './routes/Home'
import Works from './routes/Works'
import Blog from './routes/Blog'
import ViewPost from './routes/ViewPost'
import Contact from './routes/Contact'
import Modify from './routes/Modify'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}>
            <Route path='works' element={<Works />} />
            <Route path='blog' element={<Blog />} />
            <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='/modify' element={<Modify />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/blog/post/:postId' element={<ViewPost />} />
    </Routes>
  )
}

export default App