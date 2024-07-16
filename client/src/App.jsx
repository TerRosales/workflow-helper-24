import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "flowbite-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Lines from "./pages/Lines";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* Navbar */}
        <Header />
        <Button gradientDuoTone="pinkToOrange">Button</Button>
        {/* Router Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
