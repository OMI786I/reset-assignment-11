import axios from "axios";
import { useEffect, useState } from "react";

const Faq = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/Questions.json`)
      .then((assignment) => {
        setLoading(false);
        setData(assignment.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  console.log(data);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="border my-16 text-white rounded-xl p-5 bg-green-600">
        <h1 className="text-center text-3xl my-10">
          Frequently Asked Questions
        </h1>
        {data.map((dat) => (
          <div className="join join-vertical w-full " key={data.question}>
            <div className="collapse collapse-arrow join-item border-base-300 border ">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium bg-[#ffbe00] text-black">
                {dat.question}
              </div>
              <div className="collapse-content bg-base-200 text-black ">
                <p>{dat.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Faq;
