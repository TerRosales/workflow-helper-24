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
  // useSelector is used to extract data from the Redux store. Here, we're pulling form data.
  const formData = useSelector((state) => state.form);

  // This state variable will store the filtered troubleshooting data based on the user's qualification.
  const [troubleshootData, setTroubleshootData] = useState([]);

  // useRef is used to reference DOM elements, allowing us to interact with them directly.
  // elementsRef will store references to all the elements we want to observe.
  const elementsRef = useRef([]);

  // hasAnimated is a ref that tracks which elements have already been animated to prevent re-animating them.
  const hasAnimated = useRef(new Set());

  // focusMode is a state that controls whether the page is in "focus mode," affecting the styling and visibility of certain elements.
  const [focusMode, setFocusMode] = useState(false);

  // This useEffect runs whenever formData.qualification changes.
  // It filters the troubleshooting data based on the selected qualification and updates the state.
  useEffect(() => {
    if (formData.qualification) {
      const filteredData = troubleShootQualifications.filter(
        (item) => item.issue === formData.qualification
      );
      setTroubleshootData(filteredData);
    }
  }, [formData]);

  // This useEffect sets up an IntersectionObserver to animate elements when they come into view.
  // IntersectionObserver is a browser API that allows us to detect when elements are visible within the viewport.
  useEffect(() => {
    if (elementsRef.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Check if the element is in view and hasn't been animated yet.
            if (
              entry.isIntersecting &&
              !hasAnimated.current.has(entry.target)
            ) {
              // Add an animation class when the element is in view.
              entry.target.classList.add("fadeInSlideIn");

              // If the element is part of the timeline, mark it as 'seen'.
              const timelinePoint = entry.target.closest(
                '[data-testid="timeline-point"]'
              );
              if (timelinePoint) {
                timelinePoint.classList.add("seen");
              }

              // Track that this element has been animated, then stop observing it.
              hasAnimated.current.add(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          // The threshold controls how much of the element needs to be visible before triggering the animation.
          threshold: 0.1,
        }
      );

      // Observe each element in elementsRef that hasn't been animated yet.
      elementsRef.current.forEach((el) => {
        if (el && !hasAnimated.current.has(el)) {
          observer.observe(el);
        }
      });

      // Cleanup the observer when the component unmounts.
      return () => observer.disconnect();
    }
  }, [troubleshootData]);

  // This function toggles the focus mode, which changes the appearance and behavior of the page.
  const handleFocusChange = (isFocused) => {
    setFocusMode(isFocused);
  };

  // The return statement is the JSX that defines the structure of the TroubleshootingPage component.
  // It includes buttons, timeline items, animations, and conditional rendering based on the state.
  return (
    <section
      className={`mx-auto max-w-2xl min-h-[75vh] h-auto overflow-auto px-8 transition-all duration-500 ${
        focusMode ? "bg-gray-900" : ""
      }`}
    >
      {/* This section displays the job and qualification from the form data, with some simple animation logic. */}
      <section className="px-4 flex justify-center my-10">
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

      {/* This div controls the Lottie animation, hiding it when focusMode is active. */}
      <div
        className={`lg:w-80 w-50 mx-auto mb-20 transition-all duration-700 ease-in-out transform origin-bottom ${
          focusMode
            ? "opacity-0 max-h-0 -translate-y-[20px]"
            : "opacity-100 max-h-[240px] translate-y-0"
        }`}
      >
        {!focusMode && <LottieAnimation2 />}
      </div>

      {/* This section builds the timeline based on the troubleshootData.
          It uses the Timeline component from Flowbite to render each troubleshooting step.
      */}
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
                      <span className="text-neutral-900 px-3 bg-blue-100 rounded-lg font-bold text-sm">
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
                    {/* This conditionally renders the ToleranceCalc component if the issue is "Tools Adjustment". */}
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
                      {/* Render each troubleshooting step as a list item. */}
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
        {/* This section provides a final note and a button for asking for help, at the end of the timeline. */}
        <section
          ref={(el) => (elementsRef.current[elementsRef.current.length] = el)}
          className="rounded-lg mb-10 p-6 flex flex-col gradientUni2 text-white mx-auto lg:w-full"
        >
          <p className="my-5 text-sm font-base">
            If issues continue to persist, please contact your manager{" "}
            <b>immediately</b>.
          </p>
          <Button className="buttonUni buttonLong self-center my-2">
            Ask for help
          </Button>
        </section>
      </section>
    </section>
  );
};

export default TroubleshootingPage;
