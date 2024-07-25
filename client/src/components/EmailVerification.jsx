import React, { useState, useRef } from "react";
import { Button } from "flowbite-react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function EmailVerification() {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const inputRefs = useRef([]);
  const { width, height } = useWindowSize();

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
      const response = await fetch(`http://localhost:3000/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setVerificationSuccess(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-[100vh] p-2 text-center bg-white">
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
      <section className="lg:w-1/2 mx-auto rounded p-2 my-14 border-neutral-900 border-2">
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
          {verificationSuccess && (
            <Confetti
              width={width}
              height={height}
              colors={[
                "#f44336",
                "#2196f3",
                "#ffeb3b",
                "#4caf50",
                "#ff9800",
                "#808080",
                "#d3d3d3",
                "#ADD8E6",
                "#00008B",
              ]}
              friction={0.87}
              gravity={0.1}
              numberOfPieces={100}
              initialVelocityX={5}
              initialVelocityY={5}
            />
          )}
          <Button
            type="submit"
            className="buttonUniLight mb-5 w-[100px] mx-auto"
          >
            Verify
          </Button>
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
