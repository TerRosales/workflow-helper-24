// Import necessary components and icons
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel, Button, Alert } from "flowbite-react";

function Signup() {
  // State management for form data, confirmation password, errors, password visibility, loading status, and success message
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes and perform validation for the username
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "username") {
      validateUsername(e.target.value);
    }
  };

  // Handle changes in the confirm password field and validate the password
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(formData.password, e.target.value);
  };

  // Function to validate the username based on specific rules
  const validateUsername = (username) => {
    const errors = [];
    const regexNoSpaces = /^\S*$/;
    const regexNoSpecialChars = /^[a-zA-Z0-9]*$/;
    const regexLength = /^.{8,15}$/;

    if (!regexNoSpaces.test(username)) {
      errors.push("Username must not contain spaces.");
    }
    if (!regexNoSpecialChars.test(username)) {
      errors.push("Username must not contain special characters.");
    }
    if (!regexLength.test(username)) {
      errors.push("Username must be 8-15 characters long.");
    }
    setErrors((prevErrors) => [
      ...prevErrors.filter((error) => !error.includes("Username")),
      ...errors,
    ]);
    return errors.length === 0;
  };

  // Function to validate the password and check if it matches the confirm password
  const validatePassword = (password, confirmPassword) => {
    const errors = [];
    const regexUppercase = /(?=.*[A-Z])/;
    const regexLowercase = /(?=.*[a-z])/;
    const regexNumber = /(?=.*\d)/;
    const regexSpecialChar = /(?=.*[!@#$%^&*])/;

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!regexUppercase.test(password)) {
      errors.push("Password must contain at least 1 uppercase letter.");
    }
    if (!regexLowercase.test(password)) {
      errors.push("Password must contain at least 1 lowercase letter.");
    }
    if (!regexNumber.test(password)) {
      errors.push("Password must contain at least 1 number.");
    }
    if (!regexSpecialChar.test(password)) {
      errors.push(
        "Password must contain at least 1 special character (!@#$%^&*)."
      );
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }
    setErrors((prevErrors) => [
      ...prevErrors.filter((error) => !error.includes("Password")),
      ...errors,
    ]);
    return errors.length === 0;
  };

  // Handle form submission for the signup process
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (
      !validateUsername(formData.username) ||
      !validatePassword(formData.password, confirmPassword)
    ) {
      return; // If validation fails, stop the submission
    }
    try {
      setLoading(true); // Show loading state
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send form data to the server
        }
      );
      const data = await res.json();
      setLoading(false); // Hide loading state
      if (!data.success) {
        setErrors([data.message || "Something went wrong, please try again"]); // Show error message if signup fails
        return;
      }
      setSuccess("Signup Success, Redirecting to verification..."); // Show success message
      setTimeout(() => {
        navigate("/verify-email"); // Redirect to email verification page
      }, 1500);
      setErrors([]); // Clear errors
    } catch (error) {
      setLoading(false); // Hide loading state
      setErrors(["Something went wrong, please try again"]); // Show error message on failure
    }
  };

  // Handle guest signup process
  const handleGuestSignup = async () => {
    try {
      setLoading(true); // Show loading state

      // Simulate a delay to mimic network latency (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate a successful guest signup
      const simulatedGuestData = {
        _id: "simulatedGuestId123", // Example ID, can be customized
        username: "guest_123",
      };

      // console.log("Guest signup success:", simulatedGuestData); // Commented out for production

      setLoading(false); // Hide loading state

      if (!simulatedGuestData._id) {
        setErrors(["Guest signup failed, please try again"]); // Show error if signup fails
        return;
      }

      setSuccess("Guest Signup Successful, Redirecting..."); // Show success message
      setTimeout(() => {
        navigate("/verify-email"); // Redirect to the desired page
      }, 1500);
      setErrors([]); // Clear errors
    } catch (error) {
      // console.error("Guest signup error:", error); // Commented out for production
      setLoading(false); // Hide loading state
      setErrors([error.message || "Something went wrong, please try again"]); // Show error message on failure
    }
  };

  // Render the signup form and related elements
  return (
    <div className="p-7 h-[100vh] max-w-6xl mx-auto items-center justify-center lg:mb-[10%] overflow-auto">
      <h1 className="text-4xl text-center mt-10 mb-12">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto lg:w-[35%]"
      >
        {/* Username, Email, Password, and Confirm Password input fields with floating labels */}
        <FloatingLabel
          variant="standard"
          id="username"
          type="text"
          label="Username"
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          type="text"
          id="email"
          label="Email Address"
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          onChange={(e) => {
            handleChange(e);
            validatePassword(e.target.value, confirmPassword);
          }}
        />
        <FloatingLabel
          variant="standard"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
        />
        {/* Checkbox to toggle password visibility */}
        <section className="">
          <input
            type="checkbox"
            id="showpassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showpassword" className="px-2 text-sm">
            Show Password
          </label>
        </section>
        {/* Display error messages if any */}
        {errors.length > 0 && (
          <div className="flex flex-col gap-2">
            {errors.map((error, index) => (
              <Alert className="p-2" key={index} color="failure">
                {error}
              </Alert>
            ))}
          </div>
        )}
        {/* Display success message */}
        {success && (
          <Alert className="p-2" color="success">
            {success}
          </Alert>
        )}
        {/* Sign up and guest signup buttons */}
        <section className="flex mx-auto gap-10">
          <Button
            type="submit"
            className="buttonUni my-7  bg-neutral-950 self-center"
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
          <Button
            onClick={handleGuestSignup}
            className="buttonUni my-7  bg-neutral-950 self-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Guest"}
          </Button>
        </section>
        {/* Link to sign-in page */}
        <div className="flex mx-auto text-sm mb-5 justify-around">
          <p>Have an account?&nbsp;</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
