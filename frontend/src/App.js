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
function App() {


  return (

    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home /> } />
      
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
