import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { updateFormData } from "../redux/user/formSlice.js"; // import resetFormData if needed
import { IoMdInformationCircleOutline } from "react-icons/io";

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

  const [checkListState, setCheckListState] = useState(
    Array(line.troubleShootingCheckList.length).fill(false)
  );
  const navigate = useNavigate();

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

  const handleCheckListChange = (index) => {
    const newCheckListState = [...checkListState];
    newCheckListState[index] = !newCheckListState[index];
    setCheckListState(newCheckListState);
  };

  const allCheckListItemsChecked = checkListState.every((item) => item);

  const qualificationKeys = Object.keys(line.troubleShootQualifications);
  const qualificationOptions = formData.qualificationKey
    ? line.troubleShootQualifications[formData.qualificationKey].map(
        (q) => q.issue
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
              <option key={`${job}-${index}`} value={job}>
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
            Select Issue:
          </label>
          <Select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            disabled={!formData.qualificationKey}
          >
            <option value="">Select Issue</option>
            {qualificationOptions.map((qualification, index) => (
              <option key={`${qualification}-${index}`} value={qualification}>
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
                <section className="flex text-center flex-col decoration-red-400">
                  <label className="font-semibold" htmlFor="otherField">
                    Let&apos;s prepare to Troubleshoot{" "}
                  </label>
                  <section className="mx-auto">
                    <Tooltip
                      content="Tap/Click to checkout item"
                      animation="duration-150"
                    >
                      <IoMdInformationCircleOutline className="pulse2 mt-4 text-2xl text-red-500 hover:text-neutral-900" />
                    </Tooltip>
                  </section>
                </section>
                <section className="flex flex-col gap-2 my-5 text-sm">
                  {line.troubleShootingCheckList.map((item, index) => (
                    <section
                      key={`${item}-${index}`}
                      className="flex px-4 text-left items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={`checklist-${index}`}
                        className="hidden" // Hiding the checkbox
                        checked={checkListState[index]}
                        onChange={() => handleCheckListChange(index)}
                      />
                      <label
                        htmlFor={`checklist-${index}`}
                        className={`cursor-pointer ${
                          checkListState[index] ? "line-through" : "pulse"
                        }`}
                        style={{
                          textDecoration: checkListState[index]
                            ? "line-through"
                            : "none",
                          color: checkListState[index]
                            ? "text-blue-600"
                            : "inherit", // Tailwind's blue-600 color
                        }}
                      >
                        {item}
                      </label>
                    </section>
                  ))}
                </section>
                <section className="flex items-center justify-center mt-8 mb-5">
                  <Button
                    className="buttonUni buttongLong"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    className="buttonUni buttongLong"
                    onClick={handleSubmit}
                    disabled={!allCheckListItemsChecked}
                  >
                    Submit
                  </Button>
                </section>
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
    troubleShootingCheckList: PropTypes.arrayOf(PropTypes.string),
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
