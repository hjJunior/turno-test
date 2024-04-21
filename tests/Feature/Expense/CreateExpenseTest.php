<?php

use App\Models\BankAccount;
use App\Models\Expense;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;

test('user can create expense', function () {
    $user = User::factory()->create();
    $bankAccount = BankAccount::factory()->for($user)->create(['balance' => 100.0]);

    $payload = [
        'description' => 't-shirt',
        'amount' => 100.0,
        'bank_account_id' => $bankAccount->id,
    ];

    $response = actingAsApiUser($user)
        ->postJson(route('expenses.store'), $payload)
        ->assertCreated()
        ->assertJsonPath('data.description', 't-shirt')
        ->assertJsonPath('data.amount', 100_00);

    assertDatabaseHas('expenses', [
        'id' => $response->json('data.id'),
        'amount' => 100_00,
        'description' => 't-shirt',
    ]);

    assertDatabaseHas('transactions', [
        'amount' => 100_00,
        'description' => 't-shirt',
        'transactionable_id' => $response->json('data.id'),
        'transactionable_type' => Expense::class,
    ]);

    assertDatabaseHas('bank_accounts', [
        'id' => $bankAccount->id,
        'balance' => 0,
    ]);
});

test('cannot create expense for other bank account', function () {
    $user = User::factory()->has(BankAccount::factory())->create();
    $bankAccount = $user->bankAccount;

    $payload = [
        'description' => 't-shirt',
        'amount' => 100.0,
        'bank_account_id' => $bankAccount->id,
    ];

    actingAsApiUser($user)
        ->postJson(route('expenses.store'), $payload)
        ->assertForbidden()
        ->assertJsonPath('message', 'Insufficient funds');
});

test('cannot create expense if does not have enought money', function () {
    $user = User::factory()->create();
    $bankAccount = BankAccount::factory()->create();

    $payload = [
        'description' => 't-shirt',
        'amount' => 100.0,
        'bank_account_id' => $bankAccount->id,
    ];

    actingAsApiUser($user)
        ->postJson(route('expenses.store'), $payload)
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'bank_account_id' => [
                'The selected bank account id is invalid.',
            ],
        ]);
});
