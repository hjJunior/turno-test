<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CheckDepositResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'state' => $this->state,
            'description' => $this->description,
            'amount' => $this->getRawOriginal('amount'),
            'picture' => Storage::url($this->picture),
            'bank_account' => new BankAccountResource($this->whenLoaded('bankAccount')),
        ];
    }
}
