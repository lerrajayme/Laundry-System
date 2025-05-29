<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:20',
            'home_address' => 'nullable|string|max:255',
        ]);

        $user->update($request->only(['name', 'email', 'phone_number', 'home_address']));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
}
