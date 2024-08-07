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
import CustomerService from "./pages/CustomerService";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./components/EditProfile";
import TroubleshootingPage from "./pages/TroubleshootingPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* Navbar */}
        <Header />
        {/* Router Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verified" element={<Verified />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/lines" element={<Lines />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
            <Route
              path="/troubleshooting-page"
              element={<TroubleshootingPage />}
            />
          </Route>
          <Route path="/customer-service" element={<CustomerService />} />
        </Routes>
        {/* Footer */}
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
