import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaClipboardUser } from "react-icons/fa6";
import { FaNetworkWired, FaSignOutAlt } from "react-icons/fa";
import { truncateText } from "../utils";

function Header() {
  const { currentUser } = useSelector((state) => state.user);


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
              size="md"
              color="grey" // Set the background color to white
              className="gradientUni w-[50%]" // Set the text color to black
              label={
                currentUser ? `${truncateText(currentUser.username, 7)}` : "Menu"
              }
              dismissOnClick={false}
            >
              {currentUser ? (
                <>
                  <Dropdown.Item>
                    <section className="flex flex-col justify-center items-center object-center mx-auto">
                      <Link className="my-2" to="/profile">
                        <img
                          src={currentUser.employeeImg}
                          className="border-black border-2 w-12 rounded-full h-12"
                        />
                      </Link>
                      <section className="flex flex-col text-xs font-semibold underline text-neutral-800-900">
                        <h3>{truncateText(currentUser.username, 10)}</h3>{" "}
                        <h3>{truncateText(currentUser.email, 10)}</h3>
                      </section>
                    </section>
                  </Dropdown.Item>
                  <Dropdown.Divider className="bg-blue-300" />
                  <Dropdown.Item>
                    <FaClipboardUser className="text-lg mr-2" />
                    <Link to="/profile">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <FaNetworkWired className="text-lg mr-2" />
                    <Link to="/lines">Lines</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <FaSignOutAlt className="text-lg mr-2" />
                    Sign Out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item>
                    <Link to="/signin">
                      <li className="">Sign In</li>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/signup">Sign Up</Link>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
