import { Link } from "react-router-dom";
import { Dropdown, Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { FaNetworkWired, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { signOut } from "../redux/user/userSlice";
import { truncateText } from "../utility/utils.js";
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import MultiStepForm from "./MultiStepForm"; // Import your MultiStepForm component

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const [allLines, setAllLines] = useState([]); // State for all lines data
  const [selectedLine, setSelectedLine] = useState(null); // State for selected line

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = async () => {
    await fetchAllLines(); // Fetch all lines when opening the modal
    setSelectedLine(allLines[0]); // Set a default selected line if needed
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch all lines data
  const fetchAllLines = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/lines`
      );
      const result = await response.json();
      const { data } = result;
      setAllLines(data);
    } catch (error) {
      console.error("Failed to fetch all lines:", error);
    }
  };

  useEffect(() => {
    fetchAllLines(); // Fetch lines on component mount
  }, []);

  return (
    <nav className="gradientUni2">
      <section className="flex justify-between items-center max-w-6xl mx-auto p-3 px-6">
        <Link to="/">
          <h1 className="text-lg lg:text-xl font-bold text-white">
            Workflow
            <span className="text-blue-600 text-xl m-1 helper">Helper</span>
          </h1>
        </Link>
        <ul className="flex gap-4 font-semibold text-sm text-white">
          <li className="">
            <Dropdown
              size="xs"
              color="grey"
              className="gradientUni w-[50%] lg:w-[12%]"
              label={
                currentUser
                  ? `${truncateText(currentUser.username, 7)}`
                  : "Menu"
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
                        <h3>{truncateText(currentUser.username, 8)}</h3>{" "}
                        <h3>{truncateText(currentUser.email, 8)}</h3>
                      </section>
                    </section>
                  </Dropdown.Item>
                  <Dropdown.Divider className="bg-blue-300" />
                  <Link className="text-xs" to="/profile">
                    <Dropdown.Item>
                      <FaClipboardUser className="text-lg mr-2" />
                      Profile
                    </Dropdown.Item>
                  </Link>
                  <Link className="text-xs" to="/lines">
                    <Dropdown.Item>
                      <FaNetworkWired className="text-lg mr-2" />
                      Lines
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item>
                    <MdOutlineAutoFixHigh className="text-lg mr-2" />
                    <a className="text-sm" onClick={handleOpenModal}>
                      Troubleshoot
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSignOut}>
                    <FaSignOutAlt className="text-lg mr-2" />
                    <span className="text-sm">Sign Out</span>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Dropdown.Item>
                      <li className="">Sign In</li>
                    </Dropdown.Item>
                  </Link>
                  <Link to="/signup">
                    <Dropdown.Item>
                      <li>Sign Up</li>
                    </Dropdown.Item>
                  </Link>
                </>
              )}
            </Dropdown>
          </li>
        </ul>
      </section>

      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        size="lg"
        position="center"
      >
        <Modal.Header>Troubleshoot</Modal.Header>
        <Modal.Body>
          {selectedLine && (
            <MultiStepForm
              allLines={allLines}
              onClose={handleCloseModal}
              line={selectedLine}
            />
          )}
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default Header;
