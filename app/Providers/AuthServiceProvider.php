<?php

namespace App\Providers;

use App\Models\BankAccount;
use App\Models\CheckDeposit;
use App\Models\Expense;
use App\Policies\BankAccountPolicy;
use App\Policies\CheckDepositPolicy;
use App\Policies\ExpensePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        BankAccount::class => BankAccountPolicy::class,
        CheckDeposit::class => CheckDepositPolicy::class,
        Expense::class => ExpensePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
