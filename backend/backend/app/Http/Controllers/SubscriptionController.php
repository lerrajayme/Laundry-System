<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function index()
    {
        return response()->json([
            'subscriptions' => Subscription::all()
        ]);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'CUSTOMER') {
            return response()->json(['message' => 'Only customers can create subscriptions.'], 403);
        }

        $request->validate([
            'plan_name' => 'required|string',
            'price' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $subscription = Subscription::create([
            'user_id' => Auth::id(),
            'plan_name' => $request->plan_name,
            'price' => $request->price,
            'status' => 'active',
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json(['message' => 'Subscription created', 'subscription' => $subscription], 201);
    }

    public function userSubscriptions()
    {
        if (Auth::user()->role !== 'customer') {
            return response()->json(['message' => 'Only customers can view subscriptions.'], 403);
        }

        return response()->json([
            'subscriptions' => Subscription::where('user_id', Auth::id())->get()
        ]);
    }

    public function cancel($id)
    {
        $subscription = Subscription::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        if (Auth::user()->role !== 'customer') {
            return response()->json(['message' => 'Only customers can cancel subscriptions.'], 403);
        }

        $subscription->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Subscription cancelled']);
    }
}
