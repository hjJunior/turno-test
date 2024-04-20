<?php

use App\Models\BankAccount;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Auth\Access\Response;

describe('ExpensePolicy', function () {
    describe('.store', function () {
        it('cannot when bank account has insufficient funds')
            ->expect(function () {
                $user = User::factory()
                    ->has(BankAccount::factory()->state(['balance' => 100.0]))
                    ->create();

                return policy(Expense::class)->store($user, 100_01);
            })
            ->toEqual(Response::deny('Insufficient funds'));

        it('can when bank account has sufficient funds')
            ->expect(function () {
                $user = User::factory()
                    ->has(BankAccount::factory()->state(['balance' => 100.0]))
                    ->create();

                return policy(Expense::class)->store($user, 100_00);
            })
            ->toBeTrue();
    });
});
