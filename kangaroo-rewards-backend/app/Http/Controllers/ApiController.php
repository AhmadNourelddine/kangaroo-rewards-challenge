<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    function surveysTypes(){
        $surveys=[];
        for($i=1; $i<=15; $i++){
            $file_path = storage_path()."/data_files/".$i.".json";
            $survey = json_decode(file_get_contents($file_path), true);
            $array = array($survey["survey"]);
            $surveys = array_merge($surveys, $array);
        }
        return response()->json($surveys);
    }

    function surveyQuestions(Request $request){
        $code = $request->code;
        $file_name = substr($code, -1); 
        $file_path = storage_path()."/data_files/".$file_name.".json";
        $survey = json_decode(file_get_contents($file_path), true);
        return response()->json($survey["questions"]);
    }
}
