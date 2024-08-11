// Import necessary components and icons
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FailedLoad } from "../components/FailedLoad";
import { Dropdown, Kbd, HR, Button, Modal } from "flowbite-react";
import { VscPreview } from "react-icons/vsc";
import { truncateText, formatKey } from "../utility/utils";
import MultiStepForm from "../components/MultiStepForm.jsx"; // Import the new component

function ProductPage() {
  // Get the product ID from the URL parameters and initialize state variables
  const { id } = useParams();
  const [selectedLine, setSelectedLine] = useState(null);
  const [allLines, setAllLines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState("");
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  // Fetch the selected line's details and all available lines when the component mounts
  useEffect(() => {
    const fetchLineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/lines/${id}`);
        const result = await response.json();
        const { data } = result;
        setSelectedLine(data); // Set the selected line's data
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    const fetchAllLines = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lines");
        const result = await response.json();
        const { data } = result;
        setAllLines(data); // Set the data for all available lines
      } catch (error) {
        console.error("Failed to fetch all lines:", error);
      }
    };

    fetchLineDetails();
    fetchAllLines();
  }, [id]);

  // Toggle the modal visibility
  const handleModal = () => {
    setShowModal(!showModal);
  };

  // Handle button clicks for highlighting sections
  const handleButtonClick = (sectionId) => {
    setHighlightedSection(sectionId);
    setTimeout(() => {
      setHighlightedSection(""); // Reset the highlighted section after the animation
    }, 500);
  };

  // Display an error component if the selected line's data is not available
  if (!selectedLine) {
    return <FailedLoad />;
  }

  // Render the product page layout with various sections and components
  return (
    <section className="flex flex-col h-auto mx-auto p-2 max-w-2xl fadeInSlideIn">
      {/* Page header with an icon and title */}
      <section className="flex items-center gap-2 mt-5 mb-2 fadeInSlideIn">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <VscPreview className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>
      <h2 className="text-4xl text-center pb-3 my-5 fadeInSlideIn">{selectedLine.name}</h2>

      {/* Main product section with image and dropdown */}
      <section className="relative flex justify-around p-2 items-center mt-5 gradientCard rounded-lg mx-auto shadow-lg shadow-neutral-500 fadeInSlideIn">
        <section className="flex flex-col items-center my-5 text-white fadeInSlideIn">
          <h2 className="text-xs text-center mb-5 flex flex-col fadeInSlideIn">
            <span className="my-[5px]">Product: </span>
            {truncateText(selectedLine.products[0], 12)}
          </h2>
          <Dropdown
            size="xs"
            label="Line Actions"
            className="rounded-lg z-20 fadeInSlideIn"
            onMouseEnter={() => setIsDropdownHovered(true)}
            onMouseLeave={() => setIsDropdownHovered(false)}
          >
            <Dropdown.Item className="fadeInSlideIn">Training Info</Dropdown.Item>
            <Dropdown.Item className="fadeInSlideIn">Tooling Guide</Dropdown.Item>
            <Dropdown.Item className="fadeInSlideIn" onClick={handleModal}>
              Troubleshooting
            </Dropdown.Item>
            <Dropdown.Item className="text-blue-500 font-bold fadeInSlideIn">
              Ask for Help
            </Dropdown.Item>
          </Dropdown>
        </section>

        <img
          className="w-[120px] h-[120px] rounded-lg productImg -translate-y-1 fadeInSlideIn"
          src={selectedLine.partImg}
          alt={`${selectedLine.name} image`}
        />
      </section>

      {/* Buttons to navigate to different sections on the page */}
      <Button.Group
        className={`flex mt-7 justify-center flex-wrap lg:p-0 px-14 translate-x-1 fadeInSlideIn ${
          isDropdownHovered ? "-z-20" : "z-0"
        }`}
      >
        <Button
          className="buttonUniSm fadeInSlideIn"
          onClick={() => handleButtonClick("tools")}
        >
          <a href="#tools">Tools</a>
        </Button>
        <Button
          className="buttonUniSm fadeInSlideIn"
          onClick={() => handleButtonClick("gauges")}
        >
          <a href="#gauges">Gauges</a>
        </Button>
        <Button
          className="buttonUniSm fadeInSlideIn"
          onClick={() => handleButtonClick("jobs")}
        >
          <a href="#jobs">Jobs</a>
        </Button>
        <Button
          className="buttonUniSm fadeInSlideIn"
          onClick={() => handleButtonClick("tolerances")}
        >
          <a href="#tolerances">Tolerances</a>
        </Button>
      </Button.Group>

      {/* Section for Tools */}
      <section
        className={`p-2 my-2 fadeInSlideIn ${
          highlightedSection === "tools" ? "highlightedSection" : ""
        }`}
        id="tools"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700 fadeInSlideIn">Tools</h2>
        <section className="flex flex-wrap fadeInSlideIn">
          {Array.isArray(selectedLine.tools) &&
            selectedLine.tools.map((tool) => (
              <Kbd className="px-4 fadeInSlideIn" key={tool}>
                {tool}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="hr fadeInSlideIn" />

      {/* Section for Gauges */}
      <section
        className={`p-2 my-2 fadeInSlideIn ${
          highlightedSection === "gauges" ? "highlightedSection" : ""
        }`}
        id="gauges"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700 fadeInSlideIn">Gauges</h2>
        <section className="flex flex-wrap fadeInSlideIn">
          {Array.isArray(selectedLine.gauges) &&
            selectedLine.gauges.map((gauge) => (
              <Kbd className="px-4 fadeInSlideIn" key={gauge}>
                {gauge}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="hr fadeInSlideIn" />

      {/* Section for Jobs */}
      <section
        className={`p-2 mt-2 fadeInSlideIn ${
          highlightedSection === "jobs" ? "highlightedSection" : ""
        }`}
        id="jobs"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700 fadeInSlideIn">Jobs</h2>
        <section className="flex flex-wrap fadeInSlideIn">
          {Array.isArray(selectedLine.jobs) &&
            selectedLine.jobs.map((job) => (
              <Kbd className="px-4 fadeInSlideIn" key={job}>
                {job}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="bg-blue-400 fadeInSlideIn" />

      {/* Section for Tolerances */}
      <section
        className={`p-2 pt-1 mb-5 fadeInSlideIn ${
          highlightedSection === "tolerances" ? "highlightedSection" : ""
        }`}
        id="tolerances"
      >
        <h2 className="text-start mb-2 font-semibold text-blue-700 fadeInSlideIn">
          Tolerances
        </h2>
        <section className="flex flex-col fadeInSlideIn">
          {selectedLine.tolerances &&
            Object.entries(selectedLine.tolerances).map(([key, value]) => (
              <section key={key} className="p-2 fadeInSlideIn">
                <h3 className="text-xs text-neutral-800 font-semibold fadeInSlideIn">
                  {formatKey(key)}
                </h3>

                <section className="flex flex-col p-2 fadeInSlideIn">
                  {typeof value === "object" && !Array.isArray(value) ? (
                    Object.entries(value).map(([subKey, subValue]) => (
                      <section key={subKey} className="flex flex-col my-1 fadeInSlideIn">
                        <span className="text-xs fadeInSlideIn">{formatKey(subKey)}:</span>
                        <section className="flex justify-center fadeInSlideIn">
                          <Kbd className="fadeInSlideIn">
                            Higher than {subValue.join(", but less than ")}
                          </Kbd>
                        </section>
                      </section>
                    ))
                  ) : (
                    <section className="flex justify-center fadeInSlideIn">
                      <Kbd className="w-[250px] text-center fadeInSlideIn">
                        Higher than{" "}
                        {Array.isArray(value)
                          ? value.join(", but less than ")
                          : value}
                      </Kbd>
                    </section>
                  )}
                </section>
              </section>
            ))}
        </section>
        <HR className="hr fadeInSlideIn" />
      </section>

      {/* Modal for Troubleshooting */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Troubleshooting</Modal.Header>
        <Modal.Body>
          <MultiStepForm
            allLines={allLines}
            onClose={() => setShowModal(false)}
            line={selectedLine}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default ProductPage;
