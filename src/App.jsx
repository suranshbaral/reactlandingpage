import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage"; // Import SignupPage
import LoginPage from "./Pages/LoginPage"; // Import LoginPage
import HomePage from "./Pages/HomePage";
import PaymentPage from "./Pages/PaymentPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add SignupPage route */}
        <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>
    </Router>
  );
};

export default App;

