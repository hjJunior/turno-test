<?php

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('guest user can register', function () {
    $payload = [
        'name' => fake()->name,
        'email' => fake()->email(),
        'username' => fake()->userName(),
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $response = postJson(route('users.store'), $payload)
        ->assertCreated()
        ->assertJsonPath('data.email', $payload['email'])
        ->assertJsonPath('data.username', $payload['username']);

    assertDatabaseCount('users', 1);
    assertDatabaseHas('users', [
        'id' => $response->json('data.id'),
        'email' => $payload['email'],
        'username' => $payload['username'],
        'is_admin' => false,
    ]);

    postJson(route('auth.login'), $payload)->assertOk();
});
