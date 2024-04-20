<?php

use App\Models\CheckDeposit;
use App\Models\User;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Rejected;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

test('admin can accept a pending check deposit', function () {
    $user = User::factory()->admin()->create();
    $checkDeposit = CheckDeposit::factory()->create()->fresh();

    actingAs($user)
        ->postJson(route('check-deposits.accept', $checkDeposit))
        ->assertNoContent();

    assertDatabaseHas('check_deposits', [
        'id' => $checkDeposit->id,
        'state' => Accepted::class,
    ]);

    assertDatabaseHas('transactions', [
        'transactionable_id' => $checkDeposit->id,
        'transactionable_type' => CheckDeposit::class,
        'description' => $checkDeposit->description,
        'bank_account_id' => $checkDeposit->bank_account_id,
        'amount' => $checkDeposit->getRawOriginal('amount'),
    ]);

    assertDatabaseHas('bank_accounts', [
        'id' => $checkDeposit->bank_account_id,
        'balance' => $checkDeposit->getRawOriginal('amount'),
    ]);
});

test('cannot accept a rejected check deposit', function () {
    $user = User::factory()->admin()->create();
    $checkDeposit = CheckDeposit::factory()->rejected()->create();

    actingAs($user)
        ->postJson(route('check-deposits.accept', $checkDeposit))
        ->assertForbidden()
        ->assertJsonPath('message', 'You cannot perform this operation');

    assertDatabaseHas('check_deposits', [
        'id' => $checkDeposit->id,
        'state' => Rejected::class,
    ]);
});
