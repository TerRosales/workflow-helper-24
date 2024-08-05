import { Spinner } from "flowbite-react";

export function FailedLoad() {
  return (
    <section className="h-[70vh] flex flex-col lg:h-[80vh] md:h-[90vh] sm:h-[95vh] px-6 space-x-5 max-w-2xl mx-auto text-center mb-5 justify-center items-center">
      <span className="iconEmoji rounded-xl">😢</span>
      <section className="flex flex-col mx-auto justify-center text-center items-center -translate-x-3">
        <Spinner className="w-20 h-20 my-2" />
        <h1 className="text-4xl mt-5 ">Loading Content...</h1>
        <p className="text-[16px] my-10">
          Workflow&nbsp;
          <span className="border-1 rounded-lg font-bold text-[#556cef]">
            Helper
          </span>{" "}
          ,Apologies, I am deeply committed to providing the best possible
          solution to display the content you are looking for. Please wait a
          moment while we load the content for you.
        </p>
      </section>
    </section>
  );
}
