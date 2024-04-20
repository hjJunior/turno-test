<?php

namespace App\States\CheckDepositStatus\Transitions;

use App\Models\CheckDeposit;
use App\States\CheckDepositStatus\Accepted;
use Illuminate\Support\Facades\DB;
use Spatie\ModelStates\Transition;

class ToAccepted extends Transition
{
    public function __construct(private CheckDeposit $checkDeposit)
    {
    }

    public function handle()
    {
        DB::transaction(function () {
            $this->updateCheckDepositState();
            $this->createTransation();
            $this->updateBankAccountBalance();
        });

        return $this->checkDeposit;
    }

    private function updateCheckDepositState(): void
    {
        $this->checkDeposit->update(['state' => Accepted::class]);
    }

    private function createTransation(): void
    {
        $this->checkDeposit->transaction()->create([
            'amount' => $this->checkDeposit->amount,
            'description' => $this->checkDeposit->description,
            'bank_account_id' => $this->checkDeposit->bank_account_id,
        ]);
    }

    private function updateBankAccountBalance(): void
    {
        $bankAccount = $this->checkDeposit->bankAccount();
        $bankAccount->increment('balance', $this->checkDeposit->amount);
    }
}
