<?php

use App\Models\User;

test('a authenticated user can fetch your profile details', function () {
    $user = User::factory()->create();

    actingAsApiUser($user)
        ->getJson(route('auth.me'))
        ->assertOk()
        ->assertJsonPath('data.id', $user->id)
        ->assertJsonPath('data.email', $user->email)
        ->assertJsonPath('data.bank_account', null);
});
