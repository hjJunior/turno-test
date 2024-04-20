<?php

namespace App\Actions\Expense;

use App\Models\Expense;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CreateExpense
{
    public function __invoke(array $params)
    {
        return DB::transaction(function () use ($params) {
            $expense_params = Arr::except($params, ['bank_account_id']);

            $expense = Expense::create($expense_params);
            $expense->transaction()->create($params);

            $bankAccount = $expense->transaction->bankAccount();
            $bankAccount->lockForUpdate()->decrement('balance', $expense->getRawOriginal('amount'));

            return $expense;
        });
    }
}
