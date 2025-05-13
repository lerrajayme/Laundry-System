<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaundryRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pickup_address',
        'delivery_address',
        'pickup_time',
        'status',
    ];
}
