import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdatedAssignment = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  console.log(startDate);

  //get operation

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/createdAssignment/${params.id}`)
      .then((res) => {
        setData(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleUpdateAssignment = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const difficulty = form.difficulty.value;
    const photo = form.photo.value;
    const newData = {
      title,
      description,
      marks,
      difficulty,

      startDate,
      photo,
    };
    console.log(newData);

    //update operation
    axios
      .put(`http://localhost:5000/createdAssignment/${params.id}`, newData)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully updated");
        }
        navigate("/assignments");
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        <form
          className="card-body md:w-[50%] mx-auto bg-green-600 rounded-2xl mt-10 "
          onSubmit={handleUpdateAssignment}
        >
          <h1 className="text-center font-bold text-3xl underline text-white ">
            {" "}
            You can updated Assignment here
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white"> Title </span>
            </label>
            <input
              name="title"
              type="text"
              placeholder=" title"
              className="input input-bordered"
              defaultValue={data.title}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white"> description</span>
            </label>
            <textarea
              name="description"
              placeholder="description"
              className="textarea textarea-bordered textarea-lg w-full resize-none"
              defaultValue={data.description}
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white"> marks</span>
            </label>
            <input
              name="marks"
              type="number"
              placeholder="marks"
              className="input input-bordered"
              defaultValue={data.marks}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Photo Url</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="image"
              className="input input-bordered"
              defaultValue={data.photo}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Difficulty Level</span>
            </label>
            <select name="difficulty" className="select select-bordered">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Select due date</span>
            </label>
            <DatePicker
              selected={startDate}
              defaultValue={data.startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-warning">Update</button>
          </div>
        </form>
      </div>
    );
};

export default UpdatedAssignment;
