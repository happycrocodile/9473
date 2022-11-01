<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Base
{
    use HasFactory;

    protected $table = 'customers';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'gender_id',
        'province_id',
        'city',
        'street_address',
        'live_mode',
        'total_purchases',
    ];

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id');
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id');
    }
}
