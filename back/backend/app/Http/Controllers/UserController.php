<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Get user details by email
     */
    public function getUserByEmail($email)
    {
        // Pangitaon ang user base sa email
        $user = User::where('email', $email)->first();

        // Kung walay user, mo-return og 404
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Kung naay user, i-return ang name ug email
        return response()->json([
            'name' => $user->name, // change if using first_name + last_name
            'email' => $user->email
        ]);
    }
}
