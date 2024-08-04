import React, { useState } from "react";
import products from "../utility/data.js";
import { Dropdown, Button } from "flowbite-react";
import { GoTools } from "react-icons/go";

function Lines() {
  const [selectedProduct, setSelectedProduct] = useState(
    Object.keys(products)[0]
  );
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

  const currentProduct = products[selectedProduct];
  const isExpanded = expandedProduct === selectedProduct;
  const description = isExpanded
    ? currentProduct.desc
    : getShortDescription(currentProduct.desc);

  return (
    <div className="h-auto flex flex-col items-center">
      <h1 className="text-4xl text-center py-10">Lines</h1>

      <Button.Group className="mb-4 flex flex-wrap justify-center">
        {Object.keys(products).map((productKey) => (
          <Button
            key={productKey}
            color={selectedProduct === productKey ? "blue" : "gray"}
            onClick={() => setSelectedProduct(productKey)}
            className="m-1 buttonUni"
          >
            {products[productKey].name}
          </Button>
        ))}
      </Button.Group>

      <section className="flex flex-col p-4 gradientCard m-5 rounded-xl shadow-lg shadow-neutral-300 max-w-lg w-full mb-16">
        <figure className="flex justify-between items-center p-6">
          <h2 className="font-bold text-2xl text-white">
            {currentProduct.name}
          </h2>
          <img
            className="w-14 h-14 rounded-lg"
            src={currentProduct.img}
            alt={currentProduct.name}
          />
        </figure>
        <section className="flex flex-col text-white p-6 gap-5">
          <p className="text-sm md:text-base">
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

          <Dropdown
            size="xs"
            color="grey"
            className="gradientUni w-full md:w-[50%] lg:w-[30%]"
            label={<GoTools className="text-lg" />}
          >
            {currentProduct.tools.map((tool) => (
              <Dropdown.Item key={tool}>{tool}</Dropdown.Item>
            ))}
          </Dropdown>
        </section>
      </section>
    </div>
  );
}

export default Lines;
