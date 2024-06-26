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
            'created_at' => $this->created_at,
            'amount' => $this->resource->getRawOriginal('amount'),
            'picture' => Storage::temporaryUrl($this->picture, now()->addHour()),
            'bank_account' => new BankAccountResource($this->whenLoaded('bankAccount')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
