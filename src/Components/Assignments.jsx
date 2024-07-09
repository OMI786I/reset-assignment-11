import axios from "axios";
import { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { FcBiohazard } from "react-icons/fc";

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
        <div className="grid grid-cols-3 mt-10">
          {data.map((data) => (
            <div key={data._id}>
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img src={data.photo} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl">{data.title}</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {" "}
                      <span>
                        <FcOk></FcOk>
                      </span>
                      <span className="font-bold">marks: {data.marks}</span>
                    </div>

                    <div className="flex items-center">
                      <FcBiohazard className="text-xl"></FcBiohazard>{" "}
                      <span className="font-bold">
                        difficulty: {data.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="card-actions justify-end">
                      <button className="btn btn-success text-white">
                        Delete
                      </button>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-success text-white">
                        Update
                      </button>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-success text-white">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Assignments;
