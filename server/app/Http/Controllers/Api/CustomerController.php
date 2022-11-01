<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Helper;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customers = [];

        $customer = new Customer();

        if ($search = $request->search) {
            $customers = Helper::filterData($search, $customer, ['id', 'phone']);
        
        } else {
            $customers = $customer->simplePaginate();
        }

        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|unique:customers',
            'gender_id' => 'required|integer|exists:genders,id',
            'province_id' => 'required|integer|exists:provinces,id',
            'city' => 'required',
            'street_address' => 'required',
        ]);

        $customer = new Customer();
        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->gender_id = $request->gender_id;
        $customer->province_id = $request->province_id;
        $customer->city = $request->city;
        $customer->street_address = $request->street_address;
        $customer->save();

        return response()->json([
            'message' => 'Customer created successfully.',
            'data' => [
                'customer_id' => $customer->id
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->province;
        $customer->gender;

        return response()->json([
            'data' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'gender_id' => 'required|integer|exists:genders,id',
            'province_id' => 'required|integer|exists:provinces,id',
            'city' => 'required',
            'street_address' => 'required',
        ]);

        $customer = Customer::findOrFail($id);
        $customer->first_name = $request->first_name;
        $customer->last_name = $request->last_name;
        $customer->email = $request->email;
        $customer->gender_id = $request->gender_id;
        $customer->province_id = $request->province_id;
        $customer->city = $request->city;
        $customer->street_address = $request->street_address;
        $customer->save();

        return response()->json([
            'message' => 'Customer updated successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Customer::destroy($id);

        return response()->json([
            'message' => 'Customer deleted successfully.'
        ]);
    }
}
