<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountRecoveryController;

// These routes now use session + CSRF automatically
Route::post('/api/register', [RegisterController::class, 'register']);
Route::post('/api/login', [LoginController::class, 'login']);
Route::post('/api/logout', [LogoutController::class, 'logout']);
Route::post('/api/forgot', [AccountRecoveryController::class, 'forgot']);
Route::get('/api/user/{email}', [UserController::class, 'getUserByEmail']);