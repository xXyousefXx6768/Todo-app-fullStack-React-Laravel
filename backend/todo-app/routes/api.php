<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user()->load('userTodos');

    return response()->json([
        'user' => $user,
        'user_todos' => $user->userTodos
    ]);

});

Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'loginUser']);


Route::middleware('auth:sanctum')->group(function () {
    // All your authenticated routes here
    Route::post('/logout', [UserController::class, 'logoutUser']);
    Route::get('/FindTodo', [TodoController::class,'find']);
    Route::post('/CreateTodo', [TodoController::class,'create']);
    Route::put('/todos/{todo}', [TodoController::class, 'update']);
    Route::delete('/todos/{todo}', [TodoController::class, 'delete']);
});
