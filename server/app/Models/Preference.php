<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Base
{
    use HasFactory;

    protected $table = 'preferences';

    protected $fillable = [
        'user_id',
        'payment_amount',
        'refund_amount',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
