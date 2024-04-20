<?php

use App\Models\CheckDeposit;
use App\Models\User;
use Illuminate\Auth\Access\Response;

describe('CheckDepositPolicy', function () {
    describe('.store', function () {
        it('can')
            ->expect(fn () => policy(CheckDeposit::class)->store(User::factory()->create()))
            ->toBeTrue();
    });

    describe('.accept', function () {
        it('can when user is admin and check deposit is pending')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->create();

                return policy(CheckDeposit::class)->accept($user, $checkDeposit);
            })
            ->toBeTrue();

        it('cannot when user is not admin')
            ->expect(function () {
                $user = User::factory()->create();
                $checkDeposit = CheckDeposit::factory()->create();

                return policy(CheckDeposit::class)->accept($user, $checkDeposit);
            })
            ->toEqual(Response::deny('Only admins can accept check deposit'));

        it('cannot when check deposit is already accepted')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->accepted()->create();

                return policy(CheckDeposit::class)->accept($user, $checkDeposit);
            })
            ->toEqual(Response::deny('You cannot perform this operation'));

        it('cannot when check deposit is already rejected')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->rejected()->create();

                return policy(CheckDeposit::class)->accept($user, $checkDeposit);
            })
            ->toEqual(Response::deny('You cannot perform this operation'));
    });

    describe('.reject', function () {
        it('can when user is admin and check deposit is pending')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->create();

                return policy(CheckDeposit::class)->reject($user, $checkDeposit);
            })
            ->toBeTrue();

        it('cannot when user is not admin')
            ->expect(function () {
                $user = User::factory()->create();
                $checkDeposit = CheckDeposit::factory()->create();

                return policy(CheckDeposit::class)->reject($user, $checkDeposit);
            })
            ->toEqual(Response::deny('Only admins can accept check deposit'));

        it('cannot when check deposit is already accepted')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->accepted()->create();

                return policy(CheckDeposit::class)->reject($user, $checkDeposit);
            })
            ->toEqual(Response::deny('You cannot perform this operation'));

        it('cannot when check deposit is already rejected')
            ->expect(function () {
                $user = User::factory()->admin()->create();
                $checkDeposit = CheckDeposit::factory()->rejected()->create();

                return policy(CheckDeposit::class)->reject($user, $checkDeposit);
            })
            ->toEqual(Response::deny('You cannot perform this operation'));
    });
});
