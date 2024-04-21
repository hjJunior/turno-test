<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $attributes = $request->safe()->except('password_confirmation');
        $user = User::create($attributes);

        return new UserResource($user);
    }
}
