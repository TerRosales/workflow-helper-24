import React, { useState } from "react";
import lines from "../utility/data.js";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "flowbite-react";
import { GoTools } from "react-icons/go";
import { PiNetworkBold } from "react-icons/pi";
import { LuClipboardPaste } from "react-icons/lu";
import { MdOutlineTroubleshoot } from "react-icons/md";

function Lines() {
  const [selectedProduct, setSelectedProduct] = useState(Object.keys(lines)[0]);
  const [expandedProduct, setExpandedProduct] = useState(null);

  const toggleDescription = (productKey) => {
    setExpandedProduct(expandedProduct === productKey ? null : productKey);
  };

  const getShortDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return desc;
  };

  const currentProduct = lines[selectedProduct];
  const isExpanded = expandedProduct === selectedProduct;
  const description = isExpanded
    ? currentProduct.desc
    : getShortDescription(currentProduct.desc);

  return (
    <div className="h-auto flex flex-col p-2">
      <div className="flex justify-content-center items-center gap-2 mb-4 mt-7">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <PiNetworkBold className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </div>
      <h1 className="text-4xl text-center pb-5">Lines</h1>

      <Button.Group className="mb-4 flex flex-wrap justify-center">
        {Object.keys(lines).map((productKey) => (
          <Button
            key={productKey}
            color={selectedProduct === productKey ? "blue" : "gray"}
            onClick={() => setSelectedProduct(productKey)}
            className="m-1 buttonUni"
          >
            {lines[productKey].name}
          </Button>
        ))}
      </Button.Group>

      <section className="flex flex-col pt-4 gradientCard m-1 rounded-xl shadow-lg shadow-neutral-300 max-w-lg w-full mb-16">
        <figure className="flex justify-between items-center p-6">
          <h2 className="font-bold text-2xl text-white">
            {currentProduct.name}
          </h2>
          <img
            className="w-20 h-20 rounded-lg productImg"
            src={currentProduct.img}
            alt={currentProduct.name}
          />
        </figure>
        <section className="clipPath flex flex-col bg-white text-white gap-5 p-6 rounded-b-xl mb-[1px]">
          <p className="text-sm md:text-base text-neutral-900">
            {description}
            {currentProduct.desc.split(" ").length > 15 && (
              <button
                className="text-blue-500 ml-2 underline text-xs"
                onClick={() => toggleDescription(selectedProduct)}
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </p>

          <section className="flex buttonGroup gap-2 px-1">
            <Dropdown
              size="sm"
              color="grey"
              className="gradientUni w-full md:w-[50%] lg:w-[30%]"
              label={<GoTools className="text-lg" />}
            >
              {currentProduct.tools.map((tool) => (
                <Dropdown.Item key={tool}>{tool}</Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown
              size="sm"
              color="grey"
              className="gradientUni w-full md:w-[50%] lg:w-[30%]"
              label={<LuClipboardPaste className="text-lg" />}
            >
              {currentProduct.jobs.map((job) => (
                <Dropdown.Item key={job}>{job}</Dropdown.Item>
              ))}
            </Dropdown>
            <Button className="buttonUni">
              <Link to="/product-page">
                <MdOutlineTroubleshoot className="text-[18px]" />
              </Link>
            </Button>
          </section>
        </section>
      </section>
    </div>
  );
}

export default Lines;
