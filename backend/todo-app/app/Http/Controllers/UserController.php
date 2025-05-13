<?php

namespace App\Http\Controllers;
use Symfony\Component\HttpFoundation\Cookie as SymfonyCookie;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Exception;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    public function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'profile_image_url' => 'nullable|mimes:jpeg,jpg,png|max:2048', // 2MB Max
        ]);

        $defaultImage = 'images/user.png';
        $imagePath = $defaultImage;

        if ($request->hasFile('profile_image_url')) {
            $imagePath = $request->file('profile_image_url')->store('profile_images', 'public');
        }

        try {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'profile_image_url' => $imagePath,
            ]);

            Auth::login($user);

            // Load userTodos relationship
            $user->load('userTodos');

            return response()->json([
                'message' => 'User created successfully!',
                'user' => $user,
                'user_todos' => $user->userTodos,
            ], 201);

        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'message' => 'This email is already registered!',
                ], 409); // Conflict
            }

            return response()->json([
                'message' => 'Database error: ' . $e->getMessage(),
            ], 500);
        }
    }


    function loginUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required'

        ]);
        if (!Auth::attempt($validatedData)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 422);
        }
        $userInfo = Auth::user()->load('userTodos');


        return response()->json([
            'message' => 'User log in successfully!',
            'user' => $userInfo,

        ], 201);


    }



public function logoutUser(Request $request): \Illuminate\Http\JsonResponse
{
    try {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if (config('session.driver') === 'database') {
            \DB::table('sessions')->where('id', $request->session()->getId())->delete();
        }

        $sessionCookie = new SymfonyCookie(
            config('session.cookie'),
            '',
            now()->subMinutes(5),
            config('session.path'),
            config('session.domain'),
            config('session.secure'),
            config('session.http_only'),
            false,
            config('session.same_site') ?? null
        );

        $xsrfCookie = new SymfonyCookie(
            'XSRF-TOKEN',
            '',
            now()->subMinutes(5),
            config('session.path'),
            config('session.domain'),
            config('session.secure'),
            false, // XSRF عادة مش HttpOnly
            false,
            config('session.same_site') ?? null
        );

        return response()->json(['message' => 'Logged out successfully'])
            ->withCookie($sessionCookie)
            ->withCookie($xsrfCookie);

    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}
}
