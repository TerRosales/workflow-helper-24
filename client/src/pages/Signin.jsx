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
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInFailure(null)); // Reset error state
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    dispatch(signInFailure(null));
  };

  const handleOAuthSuccess = () => {
    setRedirecting(true);
    setTimeout(() => {
      navigate("/profile");
      setRedirecting(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      setRedirecting(true);
      setTimeout(() => {
        navigate("/profile");
        setRedirecting(false);
      }, 1500);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-7 h-[75vh] max-w-6xl mx-auto">
      <h1 className="text-4xl text-center my-20">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        {redirecting && (
          <Alert color="success">
            Sign in successful! <b>Redirecting...</b>{" "}
          </Alert>
        )}
        <section className="flex mx-auto gap-10">
          <Button
            type="submit"
            className="buttonUni my-7  bg-neutral-950 self-center"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <OAuth onSuccess={handleOAuthSuccess} />
        </section>
        <div className="flex mx-auto text-sm justify-around">
          <p>Don&apos;t have an account?&nbsp;</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
