import React, { useState } from "react";
import { formatKey } from "../utility/utils.js";
import { Button, Tooltip } from "flowbite-react"; // Import Tooltip from Flowbite
import LottieAnimation3 from "../components/LottieAnimationCalc.jsx";
import { defaultTolerances, defaultTools } from "../utility/troubleShoot.js"; // Ensure correct import path

const ToleranceCalc = ({ tolerances, onFocusChange }) => {
  // Using state to track whether certain sections are open or closed
  const [isProfillometerOpen, setIsProfillometerOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // State for selected tolerance, tool, and measurements (which can be multiple)
  const [selectedTolerance, setSelectedTolerance] = useState("");
  const [selectedTool, setSelectedTool] = useState("");
  const [measurements, setMeasurements] = useState([""]); // Array to handle multiple measurements
  const [result, setResult] = useState(null);

  // State for animations and tracking the calculation process
  const [isCalculating, setIsCalculating] = useState(false); // State for calculation animation
  const [calculationDone, setCalculationDone] = useState(false); // State to show OK text
  const [buttonClicked, setButtonClicked] = useState(false); // State for shrinking animation
  const [svgExit, setSvgExit] = useState(false); // State for SVG exit animation
  const [isPositive, setIsPositive] = useState(true); // State to track if the number is positive or negative

  // Toggle the visibility of the Profillometer section
  const toggleProfillometer = () => {
    setIsProfillometerOpen(!isProfillometerOpen);
  };

  // Toggle the visibility of the Tolerances section
  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  // Toggle the calculator section and notify the parent component about the focus change
  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
    onFocusChange(!isCalculatorOpen); // Notify parent about the focus change
  };

  // Handle the calculation process
  const handleCalculation = (e) => {
    e.preventDefault();
    setButtonClicked(true); // Start the shrinking animation

    setTimeout(() => {
      setIsCalculating(true);
      setButtonClicked(false); // Reset the button clicked state

      // Small delay to allow for smooth SVG entry
      setTimeout(() => {
        document
          .querySelector(".scale-animation")
          .classList.add("scale-animation-active");

        // Simulate calculation time (4 seconds now to extend the SVG animation)
        setTimeout(() => {
          setSvgExit(true); // Trigger the SVG exit animation

          setTimeout(() => {
            // Perform calculations

            // Convert user input into micron units (0.0 + user entry)
            const measurementsInMicrons = measurements.map((measurement) =>
              parseFloat(`0.0${measurement}`)
            );

            // Calculate the average of the measurements
            const averagedMeasurement =
              measurementsInMicrons.reduce(
                (acc, val) => acc + parseFloat(val || 0),
                0
              ) / measurementsInMicrons.length;

            // Get tolerance range and tool micron
            const toleranceRange = defaultTolerances[selectedTolerance];
            const toolMicron = defaultTools.find(
              (tool) => tool.tool === selectedTool
            ).micron;

            let adjustedMeasurement = averagedMeasurement;

            // Adjust measurement within the tolerance range using tool micron increments
            if (adjustedMeasurement < toleranceRange[0]) {
              // Adjust upwards towards the target range using tool micron increments
              while (adjustedMeasurement + toolMicron <= toleranceRange[1]) {
                adjustedMeasurement += toolMicron;
                if (adjustedMeasurement >= toleranceRange[0]) break;
              }
            } else if (adjustedMeasurement > toleranceRange[1]) {
              // Adjust downwards towards the target range using tool micron increments
              while (adjustedMeasurement - toolMicron >= toleranceRange[0]) {
                adjustedMeasurement -= toolMicron;
                if (adjustedMeasurement <= toleranceRange[1]) break;
              }
            }

            // Set the result with the final adjusted measurement
            setResult(adjustedMeasurement.toFixed(3));

            setIsCalculating(false);
            setCalculationDone(true);
          }, 500); // Time for the SVG exit animation
        }, 3500); // Time to keep the SVG displayed before exit animation starts
      }, 100); // Adjust delay to smoothen transition
    }, 500); // Duration of the shrinking animation
  };

  // Handle changes in measurement input
  const handleMeasurementChange = (index, value) => {
    const newMeasurements = [...measurements];
    newMeasurements[index] = value;
    setMeasurements(newMeasurements);
  };

  // Add a new input field for additional measurements
  const addMeasurementField = () => {
    setMeasurements([...measurements, ""]);
  };

  // Remove an input field for measurements
  const removeMeasurementField = (index) => {
    const newMeasurements = measurements.filter((_, i) => i !== index);
    setMeasurements(newMeasurements);
  };

  // Toggle the sign of the measurement input (positive or negative)
  const toggleSign = (isPositiveSign) => {
    setIsPositive(isPositiveSign);
  };

  return (
    <section className="flex flex-col p-4 my-4 gradientUni2 rounded-md mx-auto lg:w-[90%] gap-5 transition-all duration-500 max-w-2xl">
      {/* Dark overlay when Lottie animation is playing */}
      {isCalculating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* Adjustment Calculator Section */}
      <article className="mb-6 relative z-50">
        <header className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-white">Calculator</h3>
          <button
            onClick={toggleCalculator}
            className="text-xs font-bold text-blue-400 hover:text-white"
          >
            {isCalculatorOpen ? "Minimize ▲" : "Expand ▼"}
          </button>
        </header>
        <div
          className={`transition-all duration-500 transform ${
            isCalculatorOpen
              ? "opacity-100 max-h-[500px] translate-y-0"
              : "opacity-0 max-h-0 translate-y-[-50px]"
          }`}
        >
          {isCalculatorOpen && (
            <form
              className="p-4 bg-gray-200 rounded-lg text-sm"
              onSubmit={handleCalculation}
            >
              <div className="mb-4">
                <label
                  htmlFor="toleranceSelect"
                  className="block text-xs font-medium text-gray-700"
                >
                  Select Tolerance Area:
                </label>
                <select
                  id="toleranceSelect"
                  className="text-xs mt-1 block w-full p-1 border border-gray-300 rounded-md bg-white text-black"
                  value={selectedTolerance}
                  onChange={(e) => {
                    setSelectedTolerance(e.target.value);
                    setMeasurements([""]); // Reset measurements when tolerance changes
                    setSelectedTool(""); // Reset tool selection when tolerance changes
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {Object.keys(defaultTolerances).map((key) => (
                    <option key={key} value={key}>
                      {formatKey(key)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="toolSelect"
                  className="block text-xs font-medium text-gray-700"
                >
                  Select Tool:
                </label>
                <select
                  id="toolSelect"
                  className="text-xs mt-1 block w-full p-1 border border-gray-300 rounded-md bg-white text-black"
                  value={selectedTool}
                  onChange={(e) => setSelectedTool(e.target.value)}
                >
                  <option value="" disabled>
                    Select a tool
                  </option>
                  {defaultTools.map((toolObj) => (
                    <option
                      key={toolObj.tool}
                      value={toolObj.tool}
                      disabled={
                        selectedTolerance === "tubeBore" &&
                        (toolObj.tool === "Large Wrench" ||
                          toolObj.tool === "Small Wrench")
                      }
                    >
                      {toolObj.tool} (Micron: {toolObj.micron})
                    </option>
                  ))}
                </select>
              </div>

              {measurements.map((measurement, index) => (
                <div
                  key={index}
                  className="mb-2 flex items-center justify-center lg:-translate-x-2"
                >
                  <button
                    type="button"
                    className={`text-base p-2 rounded-l-md ${
                      isPositive
                        ? "shadow-lg shadow-neutral-400 -translate-y-1 transition-all scale-[1.05] font-extrabold text-2xl bg-neutral-900 text-white"
                        : "bg-white border-[1px] border-blue-900 text-blue-600"
                    }`}
                    onClick={() => toggleSign(true)}
                  >
                    +
                  </button>

                  {/* Tooltip wrapping the input field */}
                  <Tooltip
                    className="text-xs w-[70%]"
                    content='Add a "0" before the actual value for microns'
                  >
                    <input
                      id={`measurementInput-${index}`}
                      type="number"
                      step="0.001"
                      className="text-base mt-1 block w-full p-1 border-t border-b border-gray-300 rounded-none bg-white text-black"
                      value={isPositive ? measurement : -measurement}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.replace("-", "").length <= 4) {
                          handleMeasurementChange(index, Math.abs(value));
                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.replace("-", "").length > 4) {
                          e.target.value = e.target.value.slice(0, 4);
                        }
                      }}
                    />
                  </Tooltip>

                  <button
                    type="button"
                    className={`text-base p-2 rounded-r-md ${
                      !isPositive
                        ? "shadow-lg shadow-neutral-400 -translate-y-1 transition-all scale-[1.05] font-extrabold text-2xl bg-neutral-900 text-white"
                        : "bg-white border-[1px] border-blue-900 text-blue-600"
                    }`}
                    onClick={() => toggleSign(false)}
                  >
                    -
                  </button>
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-xs text-red-500 mt-2 ml-2"
                      onClick={() => removeMeasurementField(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {selectedTolerance === "tubeBore" && (
                <button
                  type="button"
                  className="text-xs text-blue-500 mb-2"
                  onClick={addMeasurementField}
                >
                  Add Key
                </button>
              )}

              {/* Button with shrinking animation */}
              <div
                className={`transition-all duration-500 transform ${
                  buttonClicked ? "shrink-button" : ""
                }`}
              >
                {!isCalculating && !calculationDone && (
                  <Button
                    type="submit"
                    className="buttonUni text-white mt-4 p-2 rounded-md transition-transform transform hover:scale-105 mx-auto"
                  >
                    Calculate
                  </Button>
                )}
              </div>

              {/* SVG animation with scaling animation */}
              {isCalculating && (
                <div
                  className={`flex justify-center items-center h-20 ${
                    svgExit ? "shrink-button" : "scale-animation"
                  }`}
                >
                  <LottieAnimation3 />
                </div>
              )}

              <section className="flex text-center p-2 rounded-lg">
                {calculationDone && result && (
                  <section className="flex flex-col">
                    <span className="text-neutral-950 text-xs font-bold">
                      Final adjustments:&nbsp;
                    </span>
                    <span className="rounded-lg px-2 p-1 text-3xl font-bold text-gradient gradientUni2 inline-block mt-4">
                      {result}
                    </span>
                  </section>
                )}

                {result && (
                  <p className="mt-4 text-xs text-neutral-950 font-bold">
                    Please go ahead and adjust it.
                  </p>
                )}
              </section>
            </form>
          )}
        </div>
      </article>

      {/* Tolerances Section */}
      <article>
        <header className="flex justify-between items-center">
          <h3 className="font-bold text-xs text-white mb-6">Tolerances</h3>
          <button
            onClick={toggleSection}
            className="text-xs font-bold text-blue-400 hover:text-white"
          >
            {isSectionOpen ? "Minimize ▲" : "Expand ▼"}
          </button>
        </header>
        <div
          className={`transition-all duration-500 transform ${
            isSectionOpen
              ? "opacity-100 max-h-[1000px] translate-y-0"
              : "opacity-0 max-h-0 translate-y-[-50px]"
          }`}
        >
          {isSectionOpen && (
            <ul className="list-none text-lg text-left bg-gray-100 p-4 rounded-lg text-neutral-900">
              {Object.entries(tolerances).map(([key, value]) => {
                const formattedKey = formatKey(key);
                if (key === "profillometer") {
                  return (
                    <li key={key} className="my-2">
                      <div
                        onClick={toggleProfillometer}
                        className="cursor-pointer font-bold pulse hover:text-blue-600"
                      >
                        {formattedKey} {isProfillometerOpen ? "▲" : "▼"}
                      </div>
                      {isProfillometerOpen && (
                        <ul className="pl-4 list-disc list-inside">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <li key={subKey}>
                              {formatKey(subKey)}:{" "}
                              {Array.isArray(subValue)
                                ? subValue.join(", ")
                                : subValue}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li key={key} className="my-2">
                      <span className="font-bold">{formattedKey}: </span>
                      {Array.isArray(value)
                        ? `[${value.join(", ")}]`
                        : typeof value === "object" && value !== null
                        ? Object.entries(value).map(([subKey, subValue]) => (
                            <ul
                              key={subKey}
                              className="pl-4 list-disc list-inside"
                            >
                              <li>
                                {formatKey(subKey)}:{" "}
                                {Array.isArray(subValue)
                                  ? `[${subValue.join(", ")}]`
                                  : subValue}
                              </li>
                            </ul>
                          ))
                        : value}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      </article>
    </section>
  );
};

export default ToleranceCalc;
