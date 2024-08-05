import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel, Button, Alert } from "flowbite-react";

function Signup() {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData); // Uncomment this line to see the form data in the console
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(formData.password, e.target.value);
  };
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
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password, confirmPassword)) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setErrors([data.message || "Something went wrong, please try again"]);
        return;
      }
      setSuccess("Signup Success, Redirecting to verification...");
      setTimeout(() => {
        navigate("/verify-email");
      }, 1500);
      setErrors([]);
    } catch (error) {
      setLoading(false);
      setErrors(["Something went wrong, please try again"]);
    }
  };

  return (
    <div className="p-7 h-auto max-w-6xl mx-auto">
      <h1 className="text-4xl text-center my-10">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          // onBlur={validatePassword} will be added a feature to smoothen the user experience, at the moment alerts show as soon as the user starts typing.
        />
        <FloatingLabel
          variant="standard"
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
        />
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
        {errors.length > 0 && (
          <div className="flex flex-col gap-2">
            {errors.map((error, index) => (
              <Alert className="p-2" key={index} color="failure">
                {error}
              </Alert>
            ))}
          </div>
        )}
        {success && (
          <Alert className="p-2" color="success">
            {success}
          </Alert>
        )}
        <section className="flex mx-auto gap-10">
          <Button
            type="submit"
            className="buttonUni my-7  bg-neutral-950 self-center"
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </section>
        <div className="flex mx-auto">
          <p>Already have an account?&nbsp;</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
