import { FloatingLabel, Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="p-7 h-[75vh] max-w-6xl mx-auto">
      <h1 className="text-4xl font-extralight text-white text-center my-10">
        Sign In
      </h1>
      <form className="flex flex-col gap-4">
        <FloatingLabel variant="standard" label="Email Address" />
        <FloatingLabel variant="standard" label="Password" />
        <Button className="buttonUni my-7  bg-neutral-950 self-center">
          Sign In
        </Button>
        <div className="text-white flex mx-auto">
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
