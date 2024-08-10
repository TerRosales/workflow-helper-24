import { useSelector } from "react-redux";
import { formatKeyLines } from "../utility/utils";
import { Button } from "flowbite-react";

const TroubleshootingPage = () => {
  const formData = useSelector((state) => state.form);

  console.log("TroubleshootingPage - formData:", formData); // Debugging

  return (
    <section>
      <section>
        <Button></Button>
        <section>
          <button></button>
          <button></button>
          <button></button>
        </section>
      </section>
    </section>
  );
};

export default TroubleshootingPage;
