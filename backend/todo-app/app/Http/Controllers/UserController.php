<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class UserController extends Controller
{
function createUser(Request $request): \Illuminate\Http\JsonResponse
{
    $validatedData = $request->validate([
        'name' => 'required',
        'email' => 'required',
        'password' => 'required',
        'profile_image_url' => 'mimes:jpeg,jpg,png'
    ]);
    $defaultImage = 'images/user.png';
    if ($request->hasFile('profile_image_url')) {
        $imagePath=$request->file('profile_image_url')->store('profile_images','public');
    } else{
        $imagePath=$defaultImage;
    }
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
        'profile_image_url' => $imagePath,
    ]);

    // Log in the user and generate a token
    $token =$user->createToken('auth_token')->plainTextToken;

    $user->load('userTodos');

    // Return the response
    return response()->json([
        'message' => 'User created successfully!',
        'user' => $user,
        'token' => $token
    ], 201);
}
function loginUser(Request $request): \Illuminate\Http\JsonResponse{
    $validatedData = $request->validate([
        'email' => 'required',
        'password' => 'required'

    ]);
    $user = User::where('email', $validatedData['email'])->first();
    if (!$user || !Hash::check($validatedData['password'], $user->password)) {
        return response()->json([
            'message' => 'The provided credentials are incorrect.',
        ],422);

    }
    $token = $user->createToken('auth_token')->plainTextToken;
    $user->load('userTodos');
    return response()->json([
        'message' => 'User log in successfully!',
        'user' => $user,
        'token' => $token
    ],201);


}

function logoutUser(Request $request): \Illuminate\Http\JsonResponse
{
    Auth::logout();
    return response()->json([
        'message' => 'User logged out successfully!'
    ],200);

}



}
