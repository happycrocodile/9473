<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|exists:users,username',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();
        if (Hash::check($request->password, $user->password)) {
            $accessToken = $user->createToken('access_token')->plainTextToken;
            $user->role;
            return response()->json([
                'access_token' => $accessToken,
                'data' => $user
            ]);
        }

        return response()->json([
            'message' => 'The credentials are not valid.'
        ], 422);
    }

    public function userProfile(Request $request)
    {
        $user = $request->user();
        $user->role;

        return response()->json([
            'data' => $user
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|confirmed',
        ]);

        $user = User::findOrFail($request->user()->id);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully.'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout successfully.'
        ]);
    }
}
