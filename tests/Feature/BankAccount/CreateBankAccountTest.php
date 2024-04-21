<?php

use App\Models\BankAccount;
use App\Models\User;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('user can create bank account', function () {
    $user = User::factory()->create();

    actingAsApiUser($user)
        ->postJson(route('bank-accounts.store'))
        ->assertCreated()
        ->assertJsonPath('data.balance', 0);

    assertDatabaseHas('bank_accounts', [
        'user_id' => $user->id,
        'balance' => 0,
    ]);

    assertDatabaseCount('bank_accounts', 1);
});

test('user cannot create bank account when have one', function () {
    $user = User::factory()->has(BankAccount::factory())->create();

    actingAsApiUser($user)
        ->postJson(route('bank-accounts.store'))
        ->assertForbidden()
        ->assertJsonPath('message', 'You can have only one bank account');

    assertDatabaseCount('bank_accounts', 1);
});

test('needs to be authenticated', function () {
    postJson(route('bank-accounts.store'))
        ->assertUnauthorized();
});
