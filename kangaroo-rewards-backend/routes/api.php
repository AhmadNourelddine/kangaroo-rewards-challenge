<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/survey-types', [ApiController::class, 'surveysTypes']);
Route::post('/survey-questions', [ApiController::class, 'surveyQuestions']);
Route::post('/survey-answers', [ApiController::class, 'surveyAnswers']); 


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
