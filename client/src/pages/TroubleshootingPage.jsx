import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Timeline } from "flowbite-react";
import {
  troubleShootQualifications,
  defaultTolerances,
} from "../utility/troubleShoot.js";
import { FaCogs } from "react-icons/fa";
import LottieAnimation2 from "../components/LottieAnimationTroubleShoot.jsx";
import ToleranceCalc from "../components/ToleranceCalc.jsx";

const TroubleshootingPage = () => {
  const formData = useSelector((state) => state.form);
  const [troubleshootData, setTroubleshootData] = useState([]);
  const elementsRef = useRef([]);
  const hasAnimated = useRef(new Set());
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (formData.qualification) {
      const filteredData = troubleShootQualifications.filter(
        (item) => item.issue === formData.qualification
      );
      setTroubleshootData(filteredData);
    }
  }, [formData]);

  useEffect(() => {
    if (elementsRef.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              !hasAnimated.current.has(entry.target)
            ) {
              entry.target.classList.add("fadeInSlideIn");

              const timelinePoint = entry.target.closest(
                '[data-testid="timeline-point"]'
              );
              if (timelinePoint) {
                timelinePoint.classList.add("seen");
              }

              hasAnimated.current.add(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      elementsRef.current.forEach((el) => {
        if (el && !hasAnimated.current.has(el)) {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }
  }, [troubleshootData]);

  const handleFocusChange = (isFocused) => {
    setFocusMode(isFocused);
  };

  return (
    <section
      className={`min-h-[75vh] h-auto overflow-y-scroll px-6 transition-all duration-500 ${
        focusMode ? "bg-gray-900" : ""
      }`}
    >
      <section className="px-4 flex justify-around my-10">
        <Button
          ref={(el) => (elementsRef.current[0] = el)}
          className="buttonUni buttonLong py-4"
        >
          {formData.job}
        </Button>
        <section className="flex mx-2">
          <span
            ref={(el) => (elementsRef.current[1] = el)}
            className="gradientUni2 text-neutral-100 rounded-lg px-4 py-6 text-center font-semibold"
          >
            {formData.qualification}
          </span>
        </section>
      </section>

      <div
        className={`w-60 mx-auto mb-12 transition-all duration-700 ease-in-out transform origin-bottom ${
          focusMode
            ? "opacity-0 max-h-0 -translate-y-[20px]"
            : "opacity-100 max-h-[240px] translate-y-0"
        }`}
      >
        {!focusMode && <LottieAnimation2 />}
      </div>

      <section
        className={`timeline text-xs transition-all duration-500 transform ${
          focusMode ? "translate-y-[-30px]" : "translate-y-0"
        }`}
      >
        {troubleshootData.length > 0 ? (
          <Timeline>
            {troubleshootData.map((item, index) => (
              <Timeline.Item
                key={index}
                className="timelineItem transition-opacity duration-500 ease-in-out"
              >
                <section
                  className="gradientUni2"
                  ref={(el) => (elementsRef.current[index * 3 + 2] = el)}
                >
                  <Timeline.Point
                    data-testid="timeline-point"
                    className={`timelinePoint -translate-x-[25px] gradientUni2 text-white`}
                    icon={FaCogs}
                  />
                </section>
                <Timeline.Content
                  className={`${
                    focusMode ? "text-white text-lg" : "text-black"
                  }`}
                >
                  <Timeline.Time
                    className={`text-sm ${
                      focusMode ? "text-white text-lg" : "text-neutral-500"
                    }`}
                  >
                    <p ref={(el) => (elementsRef.current[index * 3 + 3] = el)}>
                      {formData.line}{" "}
                      <span className="text-neutral-900 p-1 bg-blue-100">
                        {formData.qualificationKey.toUpperCase()}
                      </span>
                    </p>
                  </Timeline.Time>
                  <section
                    ref={(el) => (elementsRef.current[index * 3 + 4] = el)}
                  >
                    <Timeline.Title
                      className={`font-bold text-2xl ${
                        focusMode ? "text-white" : "text-blue-500"
                      }`}
                    >
                      {item.issue}
                    </Timeline.Title>
                    {item.issue === "Tools Adjustment" && (
                      <ToleranceCalc
                        tolerances={defaultTolerances}
                        onFocusChange={handleFocusChange}
                      />
                    )}
                  </section>
                  <Timeline.Body>
                    <ul
                      className={`list-disc list-inside ${
                        focusMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.troubleShootSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <p>
            No troubleshooting steps available for the selected qualification.
          </p>
        )}
        <section
          ref={(el) => (elementsRef.current[elementsRef.current.length] = el)}
          className="rounded-lg mb-10 p-6 flex flex-col gradientCard text-neutral-100 mx-auto -translate-x-3 w-3/5"
        >
          <p>
            If issues continue to persist, please contact your manager{" "}
            <b>immediately</b>.
          </p>
          <Button className="buttonUni buttonFull">Ask for help</Button>
        </section>
      </section>
    </section>
  );
};

export default TroubleshootingPage;
