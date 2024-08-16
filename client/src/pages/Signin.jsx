// Import necessary components and icons
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FloatingLabel, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

function Signin() {
  // Set up local state for form data, redirecting, and tooltip visibility
  // We also grab loading and error state from the Redux store
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [redirecting, setRedirecting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Set up navigation and dispatch hooks for routing and state management
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect to reset any errors when the component loads and to manage tooltip visibility
  useEffect(() => {
    dispatch(signInFailure(null)); // Clear previous errors

    // Automatically hide the tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Handle form field changes by updating formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(signInFailure(null)); // Clear errors when the user types
  };

  // Handle the success of OAuth (e.g., Google) login
  const handleOAuthSuccess = () => {
    setRedirecting(true); // Show redirecting message
    setTimeout(() => {
      navigate("/"); // Navigate to the homepage after a short delay
      setRedirecting(false);
    }, 1500);
  };

  // Handle form submission for sign-in
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      dispatch(signInStart()); // Start the sign-in process
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the form data to the server
        }
      );
      const data = await res.json();
      // If the sign-in fails, show an error
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      // If sign-in is successful, show a redirecting message and navigate to the profile page
      dispatch(signInSuccess(data));
      setRedirecting(true);
      setTimeout(() => {
        navigate("/lines");
        setRedirecting(false);
      }, 1500);
    } catch (error) {
      dispatch(signInFailure(error)); // Handle any errors during sign-in
    }
  };

  // Handle guest login button click
  const handleGuestLogin = async () => {
    try {
      dispatch(signInStart()); // Start the guest login process

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/guest-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies with the request
        }
      );

      const data = await res.json();
      // If guest login fails, show an error
      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      // If guest login is successful, show a redirecting message and navigate to the profile page
      dispatch(signInSuccess(data));
      setRedirecting(true);
      setTimeout(() => {
        navigate("/profile");
        setRedirecting(false);
      }, 1500);
    } catch (error) {
      // Handle any errors during guest login
      dispatch(
        signInFailure({ message: "Something went wrong. Please try again." })
      );
    }
  };

  // Render the sign-in form and related elements
  return (
    <div className="p-7 h-[75vh] overflow-auto max-h-[80vh] max-w-6xl mx-auto mb-10 relative">
      <h1 className="text-4xl text-center mt-10 mb-12">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email and Password input fields with floating labels */}
        <FloatingLabel
          onChange={handleChange}
          variant="standard"
          label="Email Address"
          type="email"
          id="email"
        />
        <FloatingLabel
          onChange={handleChange}
          variant="standard"
          label="Password"
          type="password"
          id="password"
        />
        {/* Display error message if there's an error */}
        {error && (
          <>
            <Alert color="failure">{error.message}</Alert>
            <Alert color="failure">
              <p>
                In case of account credential lost please visit our{" "}
                <b>
                  <Link
                    className="underline underline-offset-1]"
                    to="/customer-service"
                  >
                    Account Retreaval Page
                  </Link>
                </b>{" "}
              </p>
            </Alert>
          </>
        )}
        {/* Display a success message if redirecting */}
        {redirecting && (
          <Alert color="success">
            Sign in successful! <b>Redirecting...</b>{" "}
          </Alert>
        )}
        {/* Sign-in and OAuth buttons */}
        <section className="flex mx-auto gap-10">
          <Button
            type="submit"
            className="buttonUni my-7 bg-neutral-950 self-center"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <OAuth onSuccess={handleOAuthSuccess} />
        </section>
        {/* Link to sign-up page */}
        <div className="flex mx-auto text-sm justify-around mb-10">
          <p>Don&apos;t have an account?&nbsp;</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </form>

      {/* Floating Guest Login Button */}
      <div className="fixed w-[90px] h-[30px] bottom-10 right-10 rounded-lg -translate-y-[10vh]">
        <Button onClick={handleGuestLogin} className="buttonUni text-white">
          Guest Login
        </Button>
      </div>
    </div>
  );
}

export default Signin;
