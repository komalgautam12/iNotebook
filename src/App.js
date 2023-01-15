import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Navbar from "./component/Navbar";
import Alert from "./component/Alert";
import NoteState from "./context/notes/NoteState";
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
    <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
