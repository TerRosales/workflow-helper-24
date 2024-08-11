import React, { useState } from "react";
import { formatKey } from "../utility/utils.js";
import { defaultTolerances, defaultTools } from "../utility/troubleShoot.js"; // Ensure correct import path

const ToleranceCalc = ({ tolerances, onFocusChange }) => {
  const [isProfillometerOpen, setIsProfillometerOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const [selectedTolerance, setSelectedTolerance] = useState("");
  const [selectedTool, setSelectedTool] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [result, setResult] = useState(null);

  const toggleProfillometer = () => {
    setIsProfillometerOpen(!isProfillometerOpen);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
    onFocusChange(!isCalculatorOpen); // Notify parent about the focus change
  };

  const handleCalculation = (e) => {
    e.preventDefault();
    // Placeholder for future calculation logic
    setResult(
      `You selected ${selectedTolerance} and ${selectedTool} with a measurement of ${measurement}`
    );
  };

  return (
    <section className="flex flex-col p-4 my-4 gradientUni2 rounded-md mx-auto lg:w-[90%] gap-5 transition-all duration-500 max-w-2xl">
      {/* Adjustment Calculator Section */}
      <article className="mb-6">
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
                  onChange={(e) => setSelectedTolerance(e.target.value)}
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
                    <option key={toolObj.tool} value={toolObj.tool}>
                      {toolObj.tool} (Micron: {toolObj.micron})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="measurementInput"
                  className="block text-xs font-medium text-gray-700"
                >
                  Enter Measurement:
                </label>
                <input
                  id="measurementInput"
                  type="number"
                  step="0.001"
                  className="text-xs mt-1 block w-full p-1 border border-gray-300 rounded-md bg-white text-black"
                  value={measurement}
                  onChange={(e) => setMeasurement(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Calculate
              </button>

              {result && <p className="mt-4 text-xs text-gray-700">{result}</p>}
            </form>
          )}
        </div>
      </article>

      {/* Tolerances Section */}
      <article>
        <header className="flex justify-between items-center">
          <h3 className="font-bold text-xs text-white">Tolerances</h3>
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
            <ul className="list-none text-lg text-left bg-gray-100 px-4 rounded-lg">
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
