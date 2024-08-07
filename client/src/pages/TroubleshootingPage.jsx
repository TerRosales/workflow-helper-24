import { useSelector } from "react-redux";
import { formatKeyLines } from "../utility/utils";

const TroubleshootingPage = () => {
  const formData = useSelector((state) => state.form);

  console.log("TroubleshootingPage - formData:", formData); // Debugging

  return (
    <div>
      <div>
        <h1>Next Step</h1>
        <p>
          <strong>Issue Area:</strong> {formData.issueArea}
        </p>
        <p>
          <strong>Job:</strong> {formData.job}
        </p>
        <p>
          <strong>Qualification Key:</strong>{" "}
          {formatKeyLines(formData.qualificationKey)}
        </p>
        <p>
          <strong>Qualification:</strong> {formData.qualification}
        </p>
      </div>
    </div>
  );
};

export default TroubleshootingPage;
