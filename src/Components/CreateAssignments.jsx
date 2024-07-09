import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const CreateAssignments = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const userEmail = user.email;
  console.log(userEmail);
  console.log(startDate);

  const handleAddAssignment = (event) => {
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
      userEmail,
      startDate,
      photo,
    };
    console.log(newData);

    axios
      .post("http://localhost:5000/createdAssignment", newData)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("You have successfully added");
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error adding the data");
        console.log(error);
      });
  };

  return (
    <div>
      <form
        className="card-body md:w-[50%] mx-auto bg-green-600 rounded-2xl mt-10 "
        onSubmit={handleAddAssignment}
      >
        <h1 className="text-center font-bold text-3xl underline text-white ">
          {" "}
          You can add Assignment here
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
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-warning">Add</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignments;
