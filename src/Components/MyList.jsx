import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";

const MyList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const email = user.email;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/submission?submitterEmail=${email}&sort=1`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [email]);

  console.log(data);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="overflow-auto">
        <table className="table table-xs">
          <thead>
            <th>Title</th>
            <th>status</th>
            <th>marks</th>
            <th>obtainedMarks</th>
            <th>Feedback</th>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td>{data.title}</td>
                <td>{data.status}</td> <td>{data.marks}</td>{" "}
                <td> {data.obtainedMarks}</td>
                <td> {data.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default MyList;
