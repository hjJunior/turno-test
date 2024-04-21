<?php

use App\Models\CheckDeposit;
use App\Models\User;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Rejected;

use function Pest\Laravel\assertDatabaseHas;

test('admin can reject a pending check deposit', function () {
    $user = User::factory()->admin()->create();
    $checkDeposit = CheckDeposit::factory()->create();

    actingAsApiUser($user)
        ->postJson(route('check-deposits.reject', $checkDeposit))
        ->assertNoContent();

    assertDatabaseHas('check_deposits', [
        'id' => $checkDeposit->id,
        'state' => Rejected::class,
    ]);
});

test('cannot reject a accepted check deposit', function () {
    $user = User::factory()->admin()->create();
    $checkDeposit = CheckDeposit::factory()->accepted()->create();

    actingAsApiUser($user)
        ->postJson(route('check-deposits.reject', $checkDeposit))
        ->assertForbidden()
        ->assertJsonPath('message', 'You cannot perform this operation');

    assertDatabaseHas('check_deposits', [
        'id' => $checkDeposit->id,
        'state' => Accepted::class,
    ]);
});
