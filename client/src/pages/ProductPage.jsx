import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FailedLoad } from "../components/FailedLoad";
import { Dropdown, Kbd, HR, Button, Modal } from "flowbite-react";
import { VscPreview } from "react-icons/vsc";
import { truncateText, formatKey } from "../utility/utils";
import MultiStepForm from "../components/MultiStepForm.jsx"; // Import the new component

function ProductPage() {
  const { id } = useParams();
  const [selectedLine, setSelectedLine] = useState(null);
  const [allLines, setAllLines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState("");

  useEffect(() => {
    const fetchLineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/lines/${id}`);
        const result = await response.json();
        const { data } = result;
        setSelectedLine(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    const fetchAllLines = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lines");
        const result = await response.json();
        const { data } = result;
        setAllLines(data);
      } catch (error) {
        console.error("Failed to fetch all lines:", error);
      }
    };

    fetchLineDetails();
    fetchAllLines();
  }, [id]);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleButtonClick = (sectionId) => {
    setHighlightedSection(sectionId);
    setTimeout(() => {
      setHighlightedSection(""); // Reset after animation
    }, 500);
  };

  if (!selectedLine) {
    return <FailedLoad />;
  }

  return (
    <section className="flex flex-col h-auto mx-auto p-1 max-w-2xl pr-4">
      <section className="flex justify-content-center items-center gap-2 mt-5">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <VscPreview className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>
      <h2 className="text-4xl text-center pb-5 mt-5">Line Details</h2>

      <Button.Group className="flex mt-7 z-5 mx-auto flex-wrap lg:p-0 px-14 translate-x-1">
        <Button
          className="buttonUni"
          onClick={() => handleButtonClick("tools")}
        >
          <a href="#tools">Tools</a>
        </Button>
        <Button
          className="buttonUni"
          onClick={() => handleButtonClick("gauges")}
        >
          <a href="#gauges">Gauges</a>
        </Button>
        <Button className="buttonUni" onClick={() => handleButtonClick("jobs")}>
          <a href="#jobs">Jobs</a>
        </Button>
        <Button
          className="buttonUni"
          onClick={() => handleButtonClick("tolerances")}
        >
          <a href="#tolerances">Tolerances</a>
        </Button>
      </Button.Group>

      <section className="flex justify-around p-2 items-center mt-5 gradientCard translate-x-2 rounded-lg mx-auto shadow-lg shadow-neutral-500">
        <section className="flex flex-col items-center my-5 text-white">
          <h2 className="text-xs text-center mb-5 flex flex-col">
            <span className="my-[5px]">Product: </span>
            {truncateText(selectedLine.products[0], 12)}
          </h2>
          <Dropdown size="xs" label="Line Actions" className="rounded-lg z-10">
            <Dropdown.Item className="">Training Info</Dropdown.Item>
            <Dropdown.Item className="">Tooling Guide</Dropdown.Item>
            <Dropdown.Item className="" onClick={handleModal}>
              Troubleshooting
            </Dropdown.Item>
            <Dropdown.Item className="text-blue-500 font-bold">
              Ask for Help
            </Dropdown.Item>
          </Dropdown>
        </section>

        <img
          className="w-[120px] h-[120px] rounded-lg productImg -translate-y-1"
          src={selectedLine.partImg}
          alt={`${selectedLine.name} image`}
        />
      </section>

      <section
        className={`p-2 my-2 ${
          highlightedSection === "tools" ? "highlightedSection" : ""
        }`}
        id="tools"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700">Tools</h2>
        <section className="flex flex-wrap">
          {Array.isArray(selectedLine.tools) &&
            selectedLine.tools.map((tool) => (
              <Kbd className="px-4" key={tool}>
                {tool}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="hr" />
      <section
        className={`p-2 my-2 ${
          highlightedSection === "gauges" ? "highlightedSection" : ""
        }`}
        id="gauges"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700">Gauges</h2>
        <section className="flex flex-wrap">
          {Array.isArray(selectedLine.gauges) &&
            selectedLine.gauges.map((gauge) => (
              <Kbd className="px-4" key={gauge}>
                {gauge}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="hr" />
      <section
        className={`p-2 mt-2 ${
          highlightedSection === "jobs" ? "highlightedSection" : ""
        }`}
        id="jobs"
      >
        <h2 className="text-start my-2 font-semibold text-blue-700">Jobs</h2>
        <section className="flex flex-wrap">
          {Array.isArray(selectedLine.jobs) &&
            selectedLine.jobs.map((job) => (
              <Kbd className="px-4" key={job}>
                {job}
              </Kbd>
            ))}
        </section>
      </section>
      <HR className="bg-blue-400" />
      <section
        className={`p-2 pt-1 mb-5 ${
          highlightedSection === "tolerances" ? "highlightedSection" : ""
        }`}
        id="tolerances"
      >
        <h2 className="text-start mb-2 font-semibold text-blue-700">
          Tolerances
        </h2>
        <section className="flex flex-col">
          {selectedLine.tolerances &&
            Object.entries(selectedLine.tolerances).map(([key, value]) => (
              <section key={key} className="p-2">
                <h3 className="text-xs text-neutral-800 font-semibold">
                  {formatKey(key)}
                </h3>

                <section className="flex flex-col p-2">
                  {typeof value === "object" && !Array.isArray(value) ? (
                    Object.entries(value).map(([subKey, subValue]) => (
                      <section key={subKey} className="flex flex-col my-1">
                        <span className="text-xs">{formatKey(subKey)}:</span>
                        <section className="flex justify-center ">
                          <Kbd className="">
                            Higher than {subValue.join(", but less than ")}
                          </Kbd>
                        </section>
                      </section>
                    ))
                  ) : (
                    <section className="flex justify-center">
                      <Kbd className="w-[250px] text-center">
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
        <HR className="hr" />
      </section>

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
