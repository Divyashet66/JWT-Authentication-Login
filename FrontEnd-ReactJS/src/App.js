import Login from "./components/Login";
import SecondPage from "./components/SecondPage";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/loggedIn" element={<SecondPage />} />
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
