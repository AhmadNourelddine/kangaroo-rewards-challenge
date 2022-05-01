import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AllSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  const navigate = useNavigate();
  const getSurveys = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/survey-types")
      .then((response) => {
        setSurveys(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <div className="App">
      <h1>Surveys</h1>
      {surveys && (
        <table style={{ margin: "auto" }}>
          <tr>
            <th>Name</th>
            <th>Code</th>
          </tr>
          {surveys.map((item) => (
            <tr>
              <td>
                <button
                  onClick={() => {
                    window.localStorage.setItem("name", item["name"]);
                    window.localStorage.setItem("code", item["code"]);
                    navigate("/survey");
                  }}
                >
                  {item["name"]}
                </button>
              </td>
              <td>{item["code"]}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default AllSurveys;
