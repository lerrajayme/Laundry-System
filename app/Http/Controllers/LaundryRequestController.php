<?php

namespace App\Http\Controllers;

use App\Models\LaundryRequest;
use Illuminate\Http\Request;

class LaundryRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'pickup_address' => 'required|string',
            'delivery_address' => 'required|string',
            'pickup_time' => 'required|date',
        ]);

        $laundryRequest = LaundryRequest::create([
            'user_id' => auth()->id(),
            'pickup_address' => $request->pickup_address,
            'delivery_address' => $request->delivery_address,
            'pickup_time' => $request->pickup_time,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Laundry request created successfully.',
            'data' => $laundryRequest,
        ], 201);
    }
}
