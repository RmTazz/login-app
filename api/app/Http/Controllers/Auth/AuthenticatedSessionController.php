<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        try{
            $request->authenticate();
            $user = $request->user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'users' => $user
            ]);

        }catch(\Illuminate\Validation\ValidationException $e){
              return response()->json([
                'message' => 'Authentication failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
       if($request->user()){
            $request->user()->currentAccessToken()->delete();       
       }
        return response()->json([
                'message'=> 'Logged out'
        ]);
    }
}
