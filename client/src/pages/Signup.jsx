import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel, Button, Alert } from "flowbite-react";

function Signup() {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formData.password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError("Something went wrong, please try again");
        return;
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="p-7 h-[90vh] overflow-scroll">
      <h1 className="text-4xl font-extralight text-white text-center my-10">
        Sign Up
      </h1>
      <form onClick={handleSubmit} className="flex flex-col gap-4">
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
          type="password"
          label="Password"
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
        />
        <Button
          type="submit"
          className="my-5 buttonUni bg-neutral-950 self-center"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <div className="text-white flex mx-auto">
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
