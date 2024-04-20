<?php

namespace App\Http\Controllers;

use App\Actions\Expense\CreateExpense;
use App\Casts\MoneyCast;
use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;

class ExpenseController extends Controller
{
    public function store(StoreExpenseRequest $request, CreateExpense $createExpense)
    {
        $amount = MoneyCast::floatToInt($request->input('amount'));
        $this->authorize('store', [Expense::class, $amount]);

        $expense = $createExpense($request->validated());

        return new ExpenseResource($expense);
    }
}
