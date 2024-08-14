import './App.css'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route>
           <Route path="/" element={<Navigate to="/blogs" />} />
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/signin' element={<Signin/>}/>
           <Route path='/blog/:id' element={<Blog/>}/>
           <Route path='/blogs' element={<Blogs/>}/>
           <Route path='/publish' element={<Publish/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
