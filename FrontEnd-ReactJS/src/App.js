import Login from "./components/Login";
import SecondPage from "./components/SecondPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loggedIn" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;
