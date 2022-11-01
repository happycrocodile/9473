<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preference_has_order', function (Blueprint $table) {
            $table->foreignId('preference_id')->constrained('preferences');
            $table->foreignId('product_id')->constrained('products');
            $table->integer('quantity');
            $table->double('fixed_price', 12, 2);
            $table->double('partial_amount', 12, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('preference_has_order');
    }
};
