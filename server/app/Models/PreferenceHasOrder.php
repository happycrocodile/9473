<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreferenceHasOrder extends Model
{
    use HasFactory;

    protected $table = 'preference_has_order';

    protected $fillable = [
        'preference_id',
        'product_id',
        'quantity',
        'fixed_price',
        'partial_amount',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public $timestamps = false;
}
