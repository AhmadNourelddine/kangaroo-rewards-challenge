<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

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
        for($i=0; $i<sizeof($survey["questions"]); $i++){
            unset($survey["questions"][$i]["answer"]);
            unset($survey["questions"][$i]["answer"]);
        }
        return response()->json($survey["questions"]);
    }

    function surveyAnswers(Request $answers){

        $code = $answers["survey"]["code"];
        $file_name = substr($code, -1); 
        $file_path = storage_path()."/data_files/".$file_name.".json";
        $survey = json_decode(file_get_contents($file_path), true);

        $result=[];

        for($i=0; $i<sizeof($answers["questions"]); $i++){
            $user_answers = $answers["questions"][$i]["answer"];
            $correct_answers = $survey["questions"][$i]["answer"];
            if($user_answers === $correct_answers){
                $array= array(
                            $answers["questions"][$i]["type"] => true,
                );
                $result = array_merge($result, $array);
            }else{
                $array= array(
                    $answers["questions"][$i]["type"] => false,
                 );
                $result = array_merge($result, $array);
            }
        }
        return response()->json($result);
    }
}
