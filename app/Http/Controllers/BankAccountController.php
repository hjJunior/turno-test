<?php

namespace App\Http\Controllers;

use App\Http\Resources\BankAccountResource;
use App\Models\BankAccount;

class BankAccountController extends Controller
{
    public function store()
    {
        $this->authorize('store', BankAccount::class);

        $bankAccount = auth()->user()->bankAccount()->create();

        return new BankAccountResource($bankAccount);
    }
}
