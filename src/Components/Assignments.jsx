import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { FcBiohazard } from "react-icons/fc";
import { AuthContext } from "../Firebase/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useLoaderData } from "react-router-dom";
const Assignments = () => {
  const count = useLoaderData();

  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPages = Math.ceil(count.length / itemsPerPage);
  console.log(numberOfPages);
  const pages = [...Array(numberOfPages).keys()];
  const handleSort = (order) => {
    setSortOrder(order);
  };
  console.log(search);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://a11-three.vercel.app/createdAssignment?difficulty=${sortOrder}&page=${currentPage}&size=${itemsPerPage}&search=${search}`,
        {
          withCredentials: "true",
        }
      )
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [sortOrder, currentPage, itemsPerPage, search]);
  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  //delete operation

  const handleDelete = (id, email) => {
    if (user.email == email) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://a11-three.vercel.app/createdAssignment/${id}`, {
              withCredentials: "true",
            })
            .then((res) => {
              //console.log(res);
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                const remaining = data.filter((data) => data._id !== id);
                setData(remaining);
              }
            });
        }
      });
    } else {
      toast.error("you are not the owner of this assignment");
    }
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="text-center">
        <label className="font-bold mr-2">Search Here</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="text-center my-4">
        <label htmlFor="sortOrder" className="font-bold mr-2">
          FIlter by Difficulty:
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
      <div>
        <label>Items per page: </label>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {data
            .filter((data) => {
              return search.toLowerCase() === ""
                ? data
                : data.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((data) => (
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
                        <button
                          className="btn btn-success text-white"
                          onClick={() => {
                            handleDelete(data._id, data.userEmail);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="card-actions justify-end">
                        <Link to={`/update/${data._id}`}>
                          <button className="btn btn-success text-white">
                            Update
                          </button>
                        </Link>
                      </div>
                      <div className="card-actions justify-end">
                        <Link to={`/details/${data._id}`}>
                          {" "}
                          <button className="btn btn-success text-white">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="my-12 flex justify-center">
        <button className="btn" onClick={handlePrevPage}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={
              (currentPage === page && "btn bg-orange-700") ||
              "btn bg-orange-500"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button className="btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Assignments;
