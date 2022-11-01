<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Base
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'status_id',
        'order_number',
        'customer_id',
        'description',
        'preference_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function preference()
    {
        return $this->belongsTo(Preference::class, 'preference_id');
    }

    public function preferenceHasOrder()
    {
        return $this->hasMany(PreferenceHasOrder::class, 'preference_id', 'preference_id');
    }
}
