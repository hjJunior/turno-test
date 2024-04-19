<?php

namespace App\Providers;

use App\Models\BankAccount;
use App\Models\CheckDeposit;
use App\Policies\BankAccountPolicy;
use App\Policies\CheckDepositPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        BankAccount::class => BankAccountPolicy::class,
        CheckDeposit::class => CheckDepositPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
