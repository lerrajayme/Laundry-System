<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class AccountRecoveryController extends Controller
{
    public function forgot(Request $request)
    {
        $company  = $request->input('company');
        $email  = $request->input('email');
        $body   = $request->input('body');
        $website = $request->input('website');
        $website_title = $request->input('website_title');
        
        $data = [
            'service_id' => 'service_c1dhrn9',
            'template_id' => 'template_q7wvz4x',
            'user_id'    => 'sUNzZI9337EDgeLIF', // e.g. o4JfF_kK2nMEXAMPLE
            'template_params' => [
                'company' => $company,
                'email_to' => $email,
                'website' => $website,
                'website_title' => $website_title,
                'body' => $body
            ]
        ];

        $response = Http::withHeaders([
            'origin' => 'http://localhost:3000'
        ])->post('https://api.emailjs.com/api/v1.0/email/send', $data);

        if ($response->successful()) {
            return response()->json(['message' => 'Email sent']);
        } else {
            return response()->json([
                'message' => 'Failed to send email',
                'error' => $response->body()
            ], 500);
        }
    }
}

