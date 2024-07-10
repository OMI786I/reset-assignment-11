import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import axios from "axios";

const AvatarTable = () => {
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
  });

  return (
    <div className="overflow-auto">
      <table className="table table-xs">
        <thead>
          <th>Title</th>
          <th>status</th>

          <th>obtainedMarks</th>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data._id}>
              <td>{data.title}</td>
              <td>{data.status}</td>
              <td> {data.obtainedMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvatarTable;
