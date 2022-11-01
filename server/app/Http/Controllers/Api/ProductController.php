<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = [];

        $product = new Product();

        if ($search = $request->search) {
            $products = Helper::filterData($search, $product, ['id', 'name']);
        } else {
            $products = $product->simplePaginate();
        }

        return response()->json($products);
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
            'name' => 'required',
            'unit_price' => 'required|numeric|min:1',
            'image_file' => 'required|image|mimes:jpeg,jpg,png|max:1024',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->unit_price = $request->unit_price;
        $product->description = $request->description;
        $product->category_id = $request->category_id;

        $imageFile = $request->file('image_file');
        $imageName = Helper::saveImageToStorage($imageFile);
        $product->image = $imageName;
        $product->save();

        return response()->json([
            'message' => 'Product created successfully.',
            'data' => [
                'product_id' => $product->id
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
        $product = Product::findOrFail($id);
        $product->category;

        return response()->json([
            'data' => $product
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
            'name' => 'required',
            'unit_price' => 'required|numeric|min:1',
            'active' => 'required|integer|min:0|max:1',
            'image_file' => 'image|mimes:jpeg,jpg,png|max:1024',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->unit_price = $request->unit_price;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->active = $request->active;

        if ($imageFile = $request->file('image_file')) {

            $storagePath = config('services.storage.path');

            $imageName = Helper::saveImageToStorage($imageFile);
            $oldImageFile = $storagePath . $product->image;
            
            if (File::exists($oldImageFile)) {
                unlink($oldImageFile);
            }
        } else {
            $imageName = $product->image;
        }

        $product->image = $imageName;
        $product->save();

        return response()->json([
            'message' => 'Product updated successfully.',
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
        $storagePath = config('services.storage.path');
        $product = Product::findOrFail($id);
        $oldImageFile = $storagePath . $product->image;

        if (File::exists($oldImageFile)) {
            unlink($oldImageFile);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.'
        ]);
    }
}
