<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiAuthenticationController
{
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::Where('email', $credentials['email'])->first();
        $isCleared = $user && Hash::check($credentials['password'], $user->password);

        if (!$isCleared) {
            return response()->json([
                'message' => 'E-mail e/ou senha incorreto(s)',
                'error' => 'Unauthorised'
            ], 401);
        }

        $token = $user->createToken('non-spa-auth-token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout(): \Illuminate\Http\JsonResponse
    {
        $user = auth('sanctum')->user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'ok' => true
        ]);
    }
}
