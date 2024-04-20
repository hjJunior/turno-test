<?php

use App\Models\BankAccount;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Auth\Access\Response;

describe('TransactionPolicy', function () {
    describe('.viewAny', function () {
        it('can when user have no bank account')
            ->expect(fn () => policy(Transaction::class)->viewAny(User::factory()->create()))
            ->toEqual(Response::deny('You have no bank account'));

        it('cannot when user have bank account')
            ->expect(fn () => policy(Transaction::class)->viewAny(User::factory()->has(BankAccount::factory())->create()))
            ->toBeTrue();
    });
});
