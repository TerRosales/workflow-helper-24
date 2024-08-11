// Import necessary components and icons
import { Button } from "flowbite-react"; // Import the Button component from Flowbite React
import { Link } from "react-router-dom"; // Import the Link component from React Router for navigation
import { IoHomeOutline } from "react-icons/io5"; // Import the home icon from React Icons

// Define the Home component, which will be the homepage and about page
function Home() {
  return (
    // Main container section with flexible layout and height settings
    <section className="flex flex-col lg:h-[80vh] md:h-[90vh] sm:h-[95vh] space-x-5 max-w-2xl mb-5 px-2 mx-auto">
      {/* Top section with horizontal lines and a home icon */}
      <section className="flex items-center gap-2 mt-4">
        <span className="w-full h-1 border-2 border-neutral-900" />{" "}
        {/* Left border line */}
        <IoHomeOutline className="text-[52px]" /> {/* Home icon */}
        <span className="w-full h-1 border-2 border-neutral-900" />{" "}
        {/* Right border line */}
      </section>

      {/* Main content section */}
      <section className="-translate-x-2 flex flex-col mx-auto justify-center items-center">
        <h1 className="text-4xl mt-6 mb-10 text-center">Welcome</h1>{" "}
        {/* Welcome heading */}
        <span className="iconEmoji rounded-xl">🤗</span>{" "}
        {/* Emoji for a friendly touch */}
        {/* Paragraph explaining the purpose of the app */}
        <p className="text-[16px] my-10 text-left text-sm">
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
        {/* Button to start the troubleshooting process, linking to another page */}
        <Button className="buttonUni buttonLong mt-2 mb-10">
          <Link to="/lines">Start Troubleshooting</Link>{" "}
          {/* Link to the troubleshooting page */}
        </Button>
      </section>
    </section>
  );
}

// Export the Home component so it can be used in other parts of the app
export default Home;
