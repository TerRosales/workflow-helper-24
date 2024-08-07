import { useState, useRef } from "react";
import { Button, Alert } from "flowbite-react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import ConfettiExplosion from "react-confetti-explosion";
import { Link, useNavigate } from "react-router-dom";

const bigExplodeProps = {
  force: 0.7,
  duration: 4000,
  particleCount: 120,
};

function EmailVerification() {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9a-z]$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move to the next input field
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = values.join("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setVerificationSuccess(true);
        setErrorMessage("");
        setIsExploding(true);
        setTimeout(() => {
          navigate("/verified");
        }, 1500);
      } else {
        console.error(data.message);
        setErrorMessage(data.message);
        setIsExploding(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsExploding(false);
    }
  };

  return (
    <div className="h-[auto] flex flex-col p-2 text-center bg-white">
      <div className="flex justify-content-center items-center gap-2 my-5">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <MdOutlineMarkEmailUnread className="text-[50px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </div>
      <p>
        We have sent you a{" "}
        <span className="font-semibold">verification code</span> to your Email
        Address that you have provided.
      </p>
      <section className="lg:w-1/2 mx-auto rounded-lg p-2 my-14 border-neutral-900 border-2">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <label className="font-semibold my-5" htmlFor="email">
            Confirm Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="mt-5 font-semibold">Enter Verification code:</span>
          <section className="flex justify-center my-5">
            {values.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 text-center border-2 border-gray-300 mx-1"
                style={{ fontSize: "20px" }}
              />
            ))}
          </section>
          <Button
            type="submit"
            className="buttonUniLight mb-5 w-[100px] mx-auto"
            disabled={verificationSuccess}
          >
             {isExploding && (
              <ConfettiExplosion {...bigExplodeProps} />
          )}
            Verify
          </Button>
         
          {errorMessage && (
            <Alert color="failure" className="p-2 text-center mb-5 mx-auto">
              <span><b>{errorMessage}</b>, Please check your email`</span>{" "}
              <p className="">
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
          )}
          {verificationSuccess && (
            <Alert color="success" className="p-2 text-center mb-5">
              Email has been verified successfully! <b>Redirecting...</b>
            </Alert>
          )}
        </form>
      </section>
      <div className="flex justify-content-center items-center gap-2 my-5">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <MdOutlineMarkEmailUnread className="text-[50px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </div>
    </div>
  );
}

export default EmailVerification;
