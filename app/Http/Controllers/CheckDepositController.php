<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckDeposit\StoreCheckDepositRequest;
use App\Http\Resources\CheckDepositResource;
use App\Models\CheckDeposit;

class CheckDepositController extends Controller
{
    public function store(StoreCheckDepositRequest $request)
    {
        $this->authorize('store', CheckDeposit::class);

        $picture = $request->file('picture')->store('/check-deposits');
        $data = array_merge($request->validated(), ['picture' => $picture]);

        $checkDeposit = CheckDeposit::create($data);

        return new CheckDepositResource($checkDeposit);
    }
}
