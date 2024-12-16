import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/auth/login";
import Home from './pages/home';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard/dashboard';
import Sendmail from './pages/auth/send_mail';
import Verifyotp from './pages/auth/verifyotp';
import ChangePassword from './pages/auth/changePassword';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmail" element={< Sendmail />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/changepassword" element={<ChangePassword/>} />
        </Routes>
      </Router>


    </>
  )
}

export default App
