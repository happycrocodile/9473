<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = [];
        $user = new User();

        if ($search = $request->search) {
            $users = Helper::filterData($search, $user, ['id', 'username']);
        } else {
            $users = $user->simplePaginate();
        }

        return response()->json($users);
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
            'username' => 'required|unique:users',
            'password' => 'required|confirmed',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $roleId = $request->role_id;

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->role_id = $roleId;
        $user->password = Hash::make($request->password);
        $user->assignRole($roleId);
        $user->save();

        return response()->json([
            'message' => 'User created successfully.',
            'data' => [
                'user_id' => $user->id
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
        $user = User::findOrFail($id);
        $user->role;

        return response()->json([
            'data' => $user
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
            'password' => 'confirmed',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $roleId = $request->role_id;

        $user = User::findOrFail($id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->removeRole($user->role_id);
        $user->assignRole($roleId);
        $user->role_id = $roleId;

        if ($password = $request->password) {
            $user->password = Hash::make($password);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully.',
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
        User::destroy($id);

        return response()->json([
            'message' => 'User deleted successfully.'
        ]);
    }
}
