import { useState } from "react";
import { Button, Select } from "flowbite-react";

const MultiStepForm = ({ line, onClose, allLines }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    issueArea: "",
    job: "",
    qualificationKey: "",
    qualification: "",
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  // Utility function to format qualification keys
  const formatKey = (key) => {
    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) //
      .join(" ");
  };

  // Get keys for the first select input
  const qualificationKeys = Object.keys(line.troubleShootQualifications);

  // Get values for the second select input based on the selected key
  const qualificationOptions = formData.qualificationKey
    ? line.troubleShootQualifications[formData.qualificationKey]
    : [];

  // Check if both issueArea and job are selected
  const isFirstStepComplete = formData.issueArea && formData.job;

  return (
    <section className="">
      {currentStep === 1 && (
        <section className="flex flex-col gap-3">
          <label className="font-semibold text-neutral-900" htmlFor="issueArea">
            Select Issue Area:
          </label>
          <Select
            id="issueArea"
            name="issueArea"
            value={formData.issueArea}
            onChange={handleChange}
          >
            <option value="">Select Line</option>
            {allLines.map((line) => (
              <option key={line.id} value={line.name}>
                {line.name}
              </option>
            ))}
          </Select>
          <label className="font-semibold text-neutral-900" htmlFor="job">
            Select Job:
          </label>
          <Select
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
          >
            <option value="">Select the job</option>
            {line.jobs.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </Select>
          <section className="flex mx-auto">
            <Button
              className="buttonUni buttongLong mx-2 my-5"
              onClick={handleNext}
              disabled={!isFirstStepComplete}
            >
              Next
            </Button>
          </section>
        </section>
      )}
      {currentStep === 2 && (
        <section className="flex flex-col gap-3">
          <label
            className="font-semibold text-neutral-900"
            htmlFor="qualificationKey"
          >
            Select Machine:
          </label>
          <Select
            id="qualificationKey"
            name="qualificationKey"
            value={formData.qualificationKey}
            onChange={handleChange}
          >
            <option value="">Select Machine</option>
            {qualificationKeys.map((key) => (
              <option key={key} value={key}>
                {formatKey(key)}
              </option>
            ))}
          </Select>
          <label
            className="font-semibold text-neutral-900"
            htmlFor="qualification"
          >
            Select Solution:
          </label>
          <Select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            disabled={!formData.qualificationKey} // Disable until a key is selected
          >
            <option value="">Select Solution</option>
            {qualificationOptions.map((qualification, index) => (
              <option key={index} value={qualification}>
                {qualification}
              </option>
            ))}
          </Select>
          <section className="flex items-center justify-center mt-5">
            <Button className="buttonUni buttongLong" onClick={handlePrevious}>
              Previous
            </Button>
            <Button
              className="buttonUni buttongLong"
              onClick={handleNext}
              disabled={!formData.qualification}
            >
              Next
            </Button>
          </section>
        </section>
      )}
      {currentStep === 3 && (
        <section className="flex flex-col gap-3">
          <label
            className="font-semibold text-neutral-900"
            htmlFor="otherField"
          >
            3rd:
          </label>
          <section className="flex mx-auto">
            <Button className="buttonUni buttongLong" onClick={handlePrevious}>
              Previous
            </Button>
            <Button className="buttonUni buttongLong" onClick={handleSubmit}>
              Submit
            </Button>
          </section>
        </section>
      )}
    </section>
  );
};

export default MultiStepForm;

import PropTypes from "prop-types";

MultiStepForm.propTypes = {
  line: PropTypes.shape({
    troubleShootQualifications: PropTypes.any,
    id: PropTypes.string,
    name: PropTypes.string,
    jobs: PropTypes.array,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  allLines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};
