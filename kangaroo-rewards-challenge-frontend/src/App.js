import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyComponent from "./pages/survey";
import AllSurveys from "./pages/AllSurveys";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/*" element={<AllSurveys />} />
        <Route exact path="/survey" element={<SurveyComponent />} />
      </Routes>
    </div>
  );
}

export default App;
