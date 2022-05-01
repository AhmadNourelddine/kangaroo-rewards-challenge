import React, { useEffect, useState } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";

const SurveyComponent = (props) => {
  const [data, setData] = useState("");
  const [survey, setSurvey] = useState("");

  var json = {
    questions: [
      {
        type: "checkbox",
        name: "car",
        title: "What car are you driving?",
        isRequired: true,
        hasSelectAll: true,
        hasNone: true,
        noneText: "None of the above",
        colCount: 4,
        choicesOrder: "asc",
        choices: [
          "Ford",
          "Tesla",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen",
        ],
      },
      {
        name: "name",
        type: "text",
        title: "Please enter your name:",
        placeHolder: "Jon Snow",
        isRequired: true,
        autoComplete: "name",
      },
      {
        name: "birthdate",
        type: "text",
        inputType: "date",
        title: "Your birthdate:",
        isRequired: true,
        autoComplete: "bdate",
      },
    ],
  };
  const onCompleteadd = (sender, options) => {
    setData(sender.data);
    console.log("Complete! Response:" + JSON.stringify(sender.data));
  };

  const getSurveyData = async () => {
    let object = {
      code: props.code,
    };
    console.log(object);
    await axios
      .post("http://127.0.0.1:8000/api/survey-questions", object)
      .then((response) => {
        setSurvey(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSurveyData();
  }, []);

  return (
    <div className="App">
      <h1>SurveyJS react example</h1>
      <h2>Checkbox - none of the above and select all</h2>
      <div id="surveyElement"></div>
      <Survey.Survey json={json} onComplete={onCompleteadd} />
    </div>
  );
};

export default SurveyComponent;
