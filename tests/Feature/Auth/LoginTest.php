<?php

use App\Models\BankAccount;
use App\Models\User;

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

test('a user can login', function () {
    $user = User::factory()->has(BankAccount::factory())->create();

    $payload = [
        'email' => $user->email,
        'password' => 'password',
    ];

    $response = postJson(route('auth.login'), $payload)
        ->assertOk()
        ->assertJsonStructure([
            'access_token',
            'expires_in',
            'token_type',
        ])
        ->assertJsonPath('token_type', 'bearer');

    $token = $response->json('access_token');

    getJson(route('auth.me'), ['Authorization' => "Bearer $token"])
        ->assertOk()
        ->assertJsonPath('id', $user->id)
        ->assertJsonPath('email', $user->email)
        ->assertJsonPath('bank_account.id', $user->bankAccount->id);
});
