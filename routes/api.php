<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaundryRequestController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Get logged-in user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Create new laundry request
    Route::post('/laundry/request', [LaundryRequestController::class, 'store']);

    // Get all laundry requests for logged-in user
    Route::get('/laundry/requests', [LaundryRequestController::class, 'index']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
