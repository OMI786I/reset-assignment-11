import axios from "axios";
import { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { FcBiohazard } from "react-icons/fc";

const Assignments = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (order) => {
    setSortOrder(order);
  };
  console.log(data);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/createdAssignment?difficulty=${sortOrder}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <div className="text-center my-4">
          <label htmlFor="sortOrder" className="font-bold mr-2">
            Sort by Difficulty:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        ;
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
