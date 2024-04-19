<?php

use App\Models\CheckDeposit;
use App\Models\User;

describe('CheckDepositPolicy', function () {
    describe('.store', function () {
        it('can')
            ->expect(fn () => policy(CheckDeposit::class)->store(User::factory()->create()))
            ->toBeTrue();
    });
});
