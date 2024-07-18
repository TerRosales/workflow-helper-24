import { FloatingLabel, Button } from "flowbite-react";

function Signup() {
  return (
    <div className="bg-neutral-900 h-[75vh] p-5">
      <h1 className="text-4xl font-extralight text-white text-center my-10">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <FloatingLabel variant="standard" label="Username" />
        <FloatingLabel variant="standard" label="Password" />
      </form>
    </div>
  );
}

export default Signup;
