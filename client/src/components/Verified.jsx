import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Verified() {
  return (
    <div className="bg-gradient-to-bl from-white to bg-neutral-200 h-[80vh] mt-10">
      <div className=" flex flex-col  p-5 gap-7">
        <section className="mb-5 flex flex-col gap-12 w-[70%] lg:w-[50%] mx-auto">
          <p className="iconEmoji">🥳</p>
          <p className="">
            <b>Congratulations</b>, you have successfully verified your account,
            Click the button below to get started.
          </p>
          <section className="CTA rounded-2xl flex h-[30vh] justify-center items-center pt-20 mb-7">
            <Button className="buttonUniLight font-bold w-[200px] mx-auto getStarted">
              <Link to="/profile">
                Get
                <span className="bg-white rounded-lg p-1 font-extraboldbold text-[#556cef]">
                  Started
                </span>{" "}
              </Link>
            </Button>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Verified;
