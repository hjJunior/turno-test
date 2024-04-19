<?php

namespace App\Http\Requests\CheckDeposit;

use App\Models\BankAccount;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCheckDepositRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'gt:0'],
            'bank_account_id' => ['required', 'integer', Rule::exists(BankAccount::class, 'id')],
            'picture' => ['required', Rule::imageFile()]
        ];
    }
}
