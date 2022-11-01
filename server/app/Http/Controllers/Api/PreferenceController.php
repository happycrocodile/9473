<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Preference;
use App\Models\PreferenceHasOrder;
use App\Models\Product;
use Illuminate\Http\Request;

class Data {
    function __construct($property)
    {
        foreach ($property as $key => $value) {
            $this->$key = $value;
        }
    }
}
class PreferenceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'preference_has_order.*.product_id' => 'required|integer|exists:products,id',
            'preference_has_order.*.quantity' => 'required|integer|min:1',
        ]);

        $paymentAmount = 0;

        $preference = new Preference();
        $preference->user_id = $request->user()->id;
        $preference->payment_amount = $paymentAmount;
        $preference->save();
        $preferenceId = $preference->id;

        foreach ($request->preference_has_order as $property) {
            $data = new Data($property);

            $quantity = $data->quantity;
            $partialAmount = 0;

            $productId = $data->product_id;

            $preferenceHasOrder = new PreferenceHasOrder();
            $preferenceHasOrder->preference_id = $preferenceId;
            $preferenceHasOrder->quantity = $quantity;
            $preferenceHasOrder->product_id = $productId;

            $product = Product::findOrFail($productId);
            $product->total_sales = $product->total_sales + $quantity;
            $product->save();

            $unitPrice = $product->unit_price;

            $partialAmount = $unitPrice * $quantity;
            $preferenceHasOrder->fixed_price = $unitPrice;
            $preferenceHasOrder->partial_amount = $partialAmount;
            $preferenceHasOrder->save();

            $paymentAmount += $partialAmount;
        }

        $paymentAmount = round($paymentAmount, 2);

        Preference::where('id', $preferenceId)->update(['payment_amount' => $paymentAmount]);

        return response()->json([
            'message' => 'Preference created successfully.',
            'data' => [
                'preference_id' => $preferenceId,
                'payment_amount' => $paymentAmount,
            ]
        ]);
    }
}
