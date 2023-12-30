
import './App.css';
import NoteState from './Context/notes/NoteState';
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
        msg: message,
        Type: type
    })
    setTimeout(() => {
      setAlert(null);

    },1500);
}
  return (
    <>
      <div className="App">
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert alert={alert}/>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/about" element={<About showAlert={showAlert} />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/Signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </BrowserRouter>
        </NoteState>
      </div>
    </>
  );
}

export default App;
