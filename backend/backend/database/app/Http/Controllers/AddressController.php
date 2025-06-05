<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function index()
    {
        return Address::where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|regex:/^\+63\d{10}$/',
        ]);

        return Address::create([
            'user_id' => Auth::id(),
            'label' => $request->label,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);
    }

    public function update(Request $request, Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'label' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|regex:/^\+63\d{10}$/',
        ]);

        $address->update($request->only('label', 'address', 'phone'));
        return $address;
    }

    public function destroy(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $address->delete();
        return response()->json(['message' => 'Address deleted successfully']);
    }
}
