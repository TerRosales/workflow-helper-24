import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Lines from "./pages/Lines";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import Verified from "./components/Verified";
import EmailVerification from "./components/EmailVerification";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* Navbar */}
        <Header />
        {/* Router Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/verified" element={<Verified />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
        {/* Footer */}
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
