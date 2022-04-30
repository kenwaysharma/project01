import './App.css';
import Home from './components/Home';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import SinglePost from './components/SinglePost';

function App() {


  return (

    <BrowserRouter>
     <Header />
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/createpost" element={<CreatePost />} />
    <Route path="/post/:id" element={<SinglePost  />} />
      <Route path="/" element={<Home /> } />
      
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
