import React, { useEffect, useState } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";

const SurveyComponent = (props) => {
  const [survey, setSurvey] = useState("");
  const [mcqQuestions, setmcqQuestions] = useState([]);
  const [numericQuestions, setnumericQuestions] = useState([]);

  var json = {
    questions: [
      {
        type: "checkbox",
        name: "mcqOptions",
        title: mcqQuestions["label"],
        isRequired: true,
        hasSelectAll: true,
        hasNone: true,
        noneText: "None of the above",
        colCount: 4,
        choicesOrder: "asc",
        choices: mcqQuestions["options"],
      },
      {
        name: "numericAnswer",
        type: "text",
        title: numericQuestions["label"],
        placeHolder: "answer in numeric",
        isRequired: true,
        autoComplete: "name",
      },
      {
        name: "date",
        type: "text",
        inputType: "date",
        title: "Enter Date:",
        isRequired: true,
        autoComplete: "bdate",
      },
    ],
  };

  const submitSurvey = async (answers) => {
    console.log(answers);
    let userMCQanswers = answers["mcqOptions"];
    let trueFalseAnswers = [];
    for (var j = 0; j < mcqQuestions["options"].length; j++) {
      if (userMCQanswers.includes(mcqQuestions["options"][j])) {
        trueFalseAnswers.push(true);
      } else {
        trueFalseAnswers.push(false);
      }
    }
    let object = {
      survey: {
        name: window.localStorage.getItem("name"),
        code: window.localStorage.getItem("code"),
      },
      questions: [
        {
          type: "qcm",
          answer: trueFalseAnswers,
        },
        {
          type: "numeric",
          answer: answers["numericAnswer"],
        },
      ],
      date: {
        date: answers["date"],
      },
    };

    console.log(object);

    await axios
      .post("http://127.0.0.1:8000/api/survey-answers", object)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCompleteadd = async (sender, options) => {
    submitSurvey(sender.data);
    console.log("Complete! Response:" + JSON.stringify(sender.data));
  };

  const getSurveyData = async () => {
    let object = {
      code: window.localStorage.getItem("code"),
    };
    console.log(object);
    await axios
      .post("http://127.0.0.1:8000/api/survey-questions", object)
      .then((response) => {
        setSurvey(response.data);
        setmcqQuestions(response.data[0]);
        setnumericQuestions(response.data[0]);
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
      <h1>Survey {window.localStorage.getItem("name")}</h1>
      <h2>Code {window.localStorage.getItem("code")}</h2>
      <div id="surveyElement"></div>
      <Survey.Survey json={json} onComplete={onCompleteadd} />
    </div>
  );
};

export default SurveyComponent;
