import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { GoTools } from "react-icons/go";
import { PiNetworkBold } from "react-icons/pi";
import { LuClipboardPaste } from "react-icons/lu";
import { MdOutlineTroubleshoot } from "react-icons/md";
import { FailedLoad } from "../components/FailedLoad";

function Lines() {
  const { currentUser } = useSelector((state) => state.user);
  const [lines, setLines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  console.log(currentUser);

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lines");
        const result = await response.json();
        setLines(result.data);
        setSelectedProduct(result.data[0]?._id || null); // Set the first line as selected by default
      } catch (error) {
        console.error("Failed to fetch lines:", error);
      }
    };
    fetchLines();
  }, []);

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

  const currentProduct = lines.find((line) => line._id === selectedProduct);
  const isExpanded = expandedProduct === selectedProduct;
  const description = isExpanded
    ? currentProduct?.desc
    : getShortDescription(currentProduct?.desc || "");

  if (!currentProduct) {
    return <FailedLoad />; // Or some other loading indicator
  }

  return (
    <div className="h-auto flex flex-col p-2 max-w-2xl overflow-auto mx-auto">
      <section className="flex justify-content-center items-center gap-2 mb-4 mt-5">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <PiNetworkBold className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>
      <h1 className="text-4xl text-center pb-5 mt-5">Lines</h1>

      <Button.Group className="mt-5 flex flex-wrap justify-center">
        {lines.map((product) => (
          <Button
            key={product._id}
            color={selectedProduct === product._id ? "blue" : "gray"}
            onClick={() => setSelectedProduct(product._id)}
            className="m-1 buttonUni"
          >
            {product.name}
          </Button>
        ))}
      </Button.Group>

      <section className="flex flex-col pt-4 gradientCard mt-10 mb-16 rounded-xl shadow-lg shadow-neutral-300 max-w-lg w-full justify-center mx-auto">
        <figure className="flex justify-between items-center p-6">
          <h2 className="font-bold text-2xl text-white">
            {currentProduct.name}
          </h2>
          <img
            className="w-20 h-20 rounded-lg productImg mb-3"
            src={currentProduct.partImg}
            alt={currentProduct.name}
          />
        </figure>
        <section className="flex flex-col bg-white text-white gap-5 p-6 rounded-b-xl mb-[1px]">
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

          <section className="flex buttonGroup gap-2 px-1 justify-between">
            <section className="flex gap-2">
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
            </section>
            <Button className="buttonUni">
              <Link to={`/product-page/${currentProduct._id}`}>
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
