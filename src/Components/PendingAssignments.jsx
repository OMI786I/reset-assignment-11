import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PendingAssignments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://a11-three.vercel.app/submission?status=pending&sort=1", {
        withCredentials: "true",
      })
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        //console.log(error);
        setLoading(false);
      });
  }, []);
  //console.log(data);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <h1 className="text-xl md:text-3xl my-10 text-center bg bg-green-500 rounded-xl text-white p-5">
          Pending Assignments
        </h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {data.map((data) => (
            <div key={data._id}>
              <div className="card bg-base-100 w-auto md:w-80 xl:w-96 shadow-xl">
                <figure>
                  <img src={data.photo} alt="Shoes" className="w-96 h-56" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl">{data.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">Total Marks</span>{" "}
                    <p>{data.marks}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Submitter</span>
                    {data.submitterName}
                  </div>
                  <div>
                    <Link to={`/evaluationCopy/${data._id}`}>
                      <button className="btn btn-success text-white">
                        Give Mark
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PendingAssignments;
