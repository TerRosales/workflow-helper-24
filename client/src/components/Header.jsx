import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";

function Header() {
  return (
    <div className="bg-neutral-950">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">
            Workflow <span className="text-[#324de7]">Helper</span>
          </h1>
        </Link>
        <ul className="flex gap-4 font-semibold text-sm text-white">
          <li className="">
            <Dropdown
              size="lg"
              color="grey" // Set the background color to white
              className="bg-neutral-200" // Set the text color to black
              label="Menu"
              dismissOnClick={false}
            >
              <Dropdown.Item>Troubleshoot</Dropdown.Item>
              <Dropdown.Item>Lines</Dropdown.Item>
              <Dropdown.Item>Tips</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>

              <Dropdown.Item>
                <Link to="signin">
                  <li className="">Sign In</li>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="signup">Sign Up</Link>
              </Dropdown.Item>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
