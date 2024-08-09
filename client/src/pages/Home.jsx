// to make this app simpler this homepage will act as a about page also
// basically only explaining the purpose of the app and who are allowed to use it.
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

function Home() {
  return (
    <section className="flex flex-col lg:h-[80vh] md:h-[90vh] sm:h-[95vh] space-x-5 max-w-2xl mb-5 px-2 mx-auto">
      <section className="flex items-center gap-2 mt-4">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <IoHomeOutline className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>

      <section className="-translate-x-2 flex flex-col mx-auto justify-center text-center items-center">
        <h1 className="text-4xl mt-6 mb-10 text-center">Welcome</h1>
        <span className="iconEmoji rounded-xl">🤗</span>
        <p className="text-[16px] my-10  text-sm">
          The{" "}
          <span className="border-1 rounded-lg font-bold text-[#556cef]">
            Workflow&nbsp;Helper
          </span>{" "}
          is meant to help our associates need less dependance from our team
          leads. In general team leads are in charge of low level maintenance
          within their designated departments, as the shift goes they are being
          prompt to take care of minor troubleshooting and maintenance tasks to
          keep their lines running all shift, according to my observations and
          feedback from the team leads, 70% of these issues can be fixed by
          anyone on the floor but what we lack is the tool that can allow us
          machinist to perform these fixes by following a step by step guide on
          each issue that they encounter.
        </p>
        <Button className="buttonUni buttonLong mt-2 mb-10">
          <Link>Start Troubleshooting</Link>
        </Button>
      </section>
    </section>
  );
}

export default Home;
