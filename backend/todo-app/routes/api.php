<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [userController::class, 'loginUser']);
Route::post('/register', [userController::class, 'createUser']);

 Route::group([ 'middleware' => 'auth:sanctum' ], function (){
     Route::get('/todos', 'TodoController@getAll');
     Route::post('/todos', 'TodoController@store');
     Route::put('/todos/{todo}', 'TodoController@update');
     Route::delete('/todos/{todo}', 'TodoController@destroy');
 }
 );


    Route::get('/any' ,function ( Request $request  ) {
   return response()->json([
        'user'=> 'lets goooooooo'
   ]);
    }
    );




