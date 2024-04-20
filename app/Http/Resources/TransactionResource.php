<?php

namespace App\Http\Resources;

use App\Http\Resources\Traits\WhenMorphToLoaded;
use App\Models\CheckDeposit;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    use WhenMorphToLoaded;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'amount' => $this->getRawOriginal('amount'),
            'transactionable' => $this->whenMorphToLoaded('transactionable', [
                CheckDeposit::class => CheckDepositResource::class,
                Expense::class => ExpenseResource::class,
            ]),
            'transactionable_type' => $this->transactionable_type,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
