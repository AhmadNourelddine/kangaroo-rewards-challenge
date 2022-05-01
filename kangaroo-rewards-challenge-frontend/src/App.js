import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyComponent from "./pages/survey";

function App() {
  return (
    <div>
      <SurveyComponent />
    </div>
  );
}

export default App;
