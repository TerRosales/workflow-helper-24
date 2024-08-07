import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { updateFormData } from "../redux/user/formSlice.js";
import { formatKeyLines } from "../utility/utils";
import LottieAnimation from "./LottieAnimation"; // Import the LottieAnimation component

const MultiStepForm = ({ line, onClose, allLines }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission success
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state
  const [isExiting, setIsExiting] = useState(false); // Track fade-out state
  const navigate = useNavigate();

  const initialFormState = {
    issueArea: "",
    job: "",
    qualificationKey: "",
    qualification: "",
  };

  const resetForm = () => {
    dispatch(updateFormData(initialFormState));
    setCurrentStep(1);
  };

  useEffect(() => {
    if (isAnimating || isExiting) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isAnimating, isExiting]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange - name:", name, "value:", value); // Debugging
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData); // Debugging
    setIsSubmitted(true); // Set submission success to true
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIsExiting(true); // Start fade-out animation
    }, 2000); // Adjust delay as needed to allow the animation to play

    setTimeout(() => {
      onClose();
      navigate("/troubleshooting-page");
      resetForm(); // Reset the form after navigating to the next stage
    }, 3000); // Adjust delay to account for fade-out animation duration
  };

  const qualificationKeys = Object.keys(line.troubleShootQualifications);
  const qualificationOptions = formData.qualificationKey
    ? line.troubleShootQualifications[formData.qualificationKey]
    : [];

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
          <Button
            className="buttonUni buttongLong mx-2 my-5"
            onClick={handleNext}
            disabled={!isFirstStepComplete}
          >
            Next
          </Button>
        </section>
      )}
      {currentStep === 2 && (
        <section className="flex flex-col gap-3">
          <label
            className="font-semibold text-neutral-900"
            htmlFor="qualificationKey"
          >
            Select Qualification Area:
          </label>
          <Select
            id="qualificationKey"
            name="qualificationKey"
            value={formData.qualificationKey}
            onChange={handleChange}
          >
            <option value="">Select Qualification Area</option>
            {qualificationKeys.map((key) => (
              <option key={key} value={key}>
                {formatKeyLines(key)}
              </option>
            ))}
          </Select>
          <label
            className="font-semibold text-neutral-900"
            htmlFor="qualification"
          >
            Select Qualification:
          </label>
          <Select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            disabled={!formData.qualificationKey}
          >
            <option value="">Select Qualification</option>
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
        <section className="flex flex-col gap-3 items-center">
          <div
            className={`lottieAnimationContainer ${
              isAnimating ? "fadeIn" : ""
            } ${isExiting ? "fadeOut" : ""}`}
          >
            {isSubmitted ? (
              <LottieAnimation /> // Display Lottie animation upon successful submission
            ) : (
              <>
                <label
                  className="font-semibold text-neutral-900"
                  htmlFor="otherField"
                >
                  3rd:
                </label>
                <Button
                  className="buttonUni buttongLong"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  className="buttonUni buttongLong"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </>
            )}
          </div>
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
