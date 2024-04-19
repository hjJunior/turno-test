<?php

namespace App\Models;

use App\Casts\MoneyCast;
use App\States\CheckDepositStatus\CheckDepositStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\ModelStates\HasStates;

class CheckDeposit extends Model
{
    use HasFactory;
    use HasStates;

    protected $guarded = [];

    protected $casts = [
        'amount' => MoneyCast::class,
        'state' => CheckDepositStatus::class,
    ];

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }
}
