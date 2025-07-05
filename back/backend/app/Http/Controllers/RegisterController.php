<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validation Rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:customer,owner,admin',
            'admin_secret' => 'required_if:role,admin|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Admin Secret Key Verification (with enhanced checks)
        if ($request->role === 'admin') {
            $receivedSecret = trim($request->admin_secret);
            $expectedSecret = trim(env('ADMIN_SECRET'));
            
            Log::debug('Admin Secret Check:', [
                'received' => $receivedSecret,
                'expected' => $expectedSecret,
                'match' => $receivedSecret === $expectedSecret
            ]);

            if ($receivedSecret !== $expectedSecret) {
                return response()->json([
                    'message' => 'Invalid admin secret key',
                    'errors' => ['admin_secret' => [
                        'The provided admin secret is invalid',
                        'Hint: Check for leading/trailing spaces'
                    ]]
                ], 403);
            }
        }

        // 3. Create User
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // 4. Generate Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only(['id', 'name', 'email', 'role'])
        ], 201);
    }
}