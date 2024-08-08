import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { updateFormData, resetFormData } from "../redux/user/formSlice.js";
import { formatKeyLines } from "../utility/utils";
import LottieAnimation from "./LottieAnimation";
import PropTypes from "prop-types";

const MultiStepForm = ({ line, onClose, allLines }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const initialFormState = {
    issueArea: "",
    job: "",
    qualificationKey: "",
    qualification: "",
  };

  const resetForm = () => {
    dispatch(resetFormData());
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
    setIsSubmitted(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    setTimeout(() => {
      onClose();
      navigate("/troubleshooting-page");
    }, 3000);
  };

  const qualificationKeys = Object.keys(line.troubleShootQualifications);
  const qualificationOptions = formData.qualificationKey
    ? line.troubleShootQualifications[formData.qualificationKey].map(
        (q) => q.solution
      )
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
                {formatKeyLines(key)}
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
            disabled={!formData.qualificationKey}
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
        <section className="flex flex-col gap-3 items-center">
          <div
            className={`lottieAnimationContainer ${
              isAnimating ? "fadeIn" : ""
            } ${isExiting ? "fadeOut" : ""}`}
          >
            {isSubmitted ? (
              <section className="flex mx-auto">
                <LottieAnimation />
              </section>
            ) : (
              <>
                <section>
                  <label
                    className="font-semibold text-neutral-900"
                    htmlFor="otherField"
                  >
                    Let's try to implement an email confirmation process to
                    secure the data and to make sure that we are logged in.
                  </label>
                </section>
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

MultiStepForm.propTypes = {
  line: PropTypes.shape({
    troubleShootQualifications: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          issue: PropTypes.string.isRequired,
          solution: PropTypes.string.isRequired,
        })
      )
    ).isRequired,
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

export default MultiStepForm;
