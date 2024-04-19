<?php

use App\Models\BankAccount;
use App\Models\User;
use Illuminate\Auth\Access\Response;

describe('BankAccountPolicy', function () {
    describe('.store', function () {
        it('can when user have no bank account')
            ->expect(fn () => policy(BankAccount::class)->store(User::factory()->create()))
            ->toBeTrue();

        it('cannot when user have bank account')
            ->expect(fn () => policy(BankAccount::class)->store(User::factory()->has(BankAccount::factory())->create()))
            ->toEqual(Response::deny('You can have only one bank account'));
    });
});
