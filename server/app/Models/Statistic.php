<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Base
{
    use HasFactory;

    protected $table = 'statistics';

    protected $fillable = [
        'total_customers',
        'total_orders',
        'total_canceled_orders',
        'total_feedbacks',
    ];
}
