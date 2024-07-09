import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Assignments = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:5000/createdAssignment")
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <Toaster />
      </div>
    );
};

export default Assignments;
