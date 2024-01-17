import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import CounterCheck from "./pages/contextUse/CounterCheck";
import Card from "./pages/contextUse/Card";
import Register from "./pages/auth/register/Register";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./pages/auth/login/LoginForm";


import './global.css'

function App() {


  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/context" element={<CounterCheck />} /> */}
          {/* <Route path="/card" element={<Card />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

export const base_url="http://localhost:8080"


