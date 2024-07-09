import { useParams } from "react-router-dom";

const SubmissionForm = () => {
  const params = useParams();
  console.log(params.id);

  return <div>This is submission form</div>;
};

export default SubmissionForm;
