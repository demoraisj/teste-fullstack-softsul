<?php

use App\Http\Controllers\ApiAuthenticationController;
use App\Http\Controllers\BranchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('token', [ApiAuthenticationController::class, 'login']);
Route::delete('token', [ApiAuthenticationController::class, 'logout']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', function (Request $request) { return $request->user(); });
    Route::apiResource('branches', BranchController::class);
});
