<?php

use App\Models\CheckDeposit;
use App\Models\User;

test('admin can view all check deposits', function () {
    $user = User::factory()->admin()->create();
    $checks = CheckDeposit::factory()->count(2)->create();

    $ids = CheckDeposit::accessibleByUser($user)->pluck('id');

    expect($ids)->toEqual($checks->pluck('id'));
});

test('normal user can view only your on check deposits', function () {
    $user = User::factory()->has(CheckDeposit::factory())->create();
    CheckDeposit::factory()->create();

    $ids = CheckDeposit::accessibleByUser($user)->pluck('id');

    expect($ids)->toEqual($user->checkDeposits()->pluck('id'));
});
