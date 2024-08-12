// Import necessary components and icons
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { GoTools } from "react-icons/go";
import { PiNetworkBold } from "react-icons/pi";
import { LuClipboardPaste } from "react-icons/lu";
import { MdOutlineTroubleshoot } from "react-icons/md";
import { FailedLoad } from "../components/FailedLoad";

function Lines() {
  // Get the current user from the Redux store and set up local state for lines and selected product
  const { currentUser } = useSelector((state) => state.user);
  const [lines, setLines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Fetch the lines data when the component mounts
  useEffect(() => {
    const fetchLines = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/lines`
        );
        const result = await response.json();
        setLines(result.data); // Store the fetched lines in state
        setSelectedProduct(result.data[0]?._id || null); // Set the first line as the selected product by default
      } catch (error) {
        console.error("Failed to fetch lines:", error); // Handle any errors during fetch
      }
    };
    fetchLines();
  }, []);

  // Toggle the expanded state for product description
  const toggleDescription = (productKey) => {
    setExpandedProduct(expandedProduct === productKey ? null : productKey);
  };

  // Truncate the product description if it's too long
  const getShortDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return desc;
  };

  // Find the current selected product and set up the description
  const currentProduct = lines.find((line) => line._id === selectedProduct);
  const isExpanded = expandedProduct === selectedProduct;
  const description = isExpanded
    ? currentProduct?.desc
    : getShortDescription(currentProduct?.desc || "");

  // Handle the case where no current product is found (e.g., loading or error state)
  if (!currentProduct) {
    return <FailedLoad />;
  }

  // Render the lines page with the selected product's details and options
  return (
    <div className="h-auto flex flex-col p-2 max-w-2xl overflow-auto mx-auto fadeInSlideIn">
      {/* Page header with an icon and title */}
      <section className="flex items-center gap-2 mt-4 mb-5 fadeInSlideIn">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <PiNetworkBold className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>
      <h1 className="text-4xl text-center pb-5 mb-2 fadeInSlideIn">Lines</h1>

      {/* Main product section with image, description, and action buttons */}
      <section className="flex flex-col pt-4 gradientCard my-5 rounded-xl shadow-lg shadow-neutral-300 max-w-lg w-full justify-center mx-auto fadeInSlideIn">
        <figure className="flex justify-between items-center p-6 fadeInSlideIn">
          <h2 className="font-bold text-2xl text-white">
            {currentProduct.name}
          </h2>
          <img
            className="w-20 h-20 rounded-lg productImg mb-3"
            src={currentProduct.partImg}
            alt={currentProduct.name}
          />
        </figure>
        <section className="flex flex-col bg-white text-white gap-5 p-6 rounded-b-xl mb-[1px] fadeInSlideIn">
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

          {/* Dropdowns for tools and jobs, and a button to navigate to the product page */}
          <section className="flex buttonGroup gap-2 px-1 justify-between fadeInSlideIn">
            <section className="flex gap-2 fadeInSlideIn">
              <Dropdown
                size="xs"
                color="grey"
                className="gradientUni w-full"
                label={<GoTools className="text-lg mt-1" />}
              >
                {currentProduct.tools.map((tool) => (
                  <Dropdown.Item key={tool}>{tool}</Dropdown.Item>
                ))}
              </Dropdown>
              <Dropdown
                size="xs"
                color="grey"
                className="gradientUni w-full"
                label={<LuClipboardPaste className="text-lg mt-1" />}
              >
                {currentProduct.jobs.map((job) => (
                  <Dropdown.Item key={job}>{job}</Dropdown.Item>
                ))}
              </Dropdown>
            </section>
            <Button className="buttonUni fadeInSlideIn">
              <Link to={`/product-page/${currentProduct._id}`}>
                <MdOutlineTroubleshoot className="text-[18px]" />
              </Link>
            </Button>
          </section>
        </section>
      </section>

      {/* Buttons for switching between different products */}
      <Button.Group className="mt-1 mb-8 flex flex-wrap justify-center fadeInSlideIn">
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
    </div>
  );
}

export default Lines;
