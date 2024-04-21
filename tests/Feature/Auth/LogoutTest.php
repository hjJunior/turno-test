<?php

use App\Models\User;

test('a user can logout', function () {
    $user = User::factory()->create();

    actingAsApiUser($user)
        ->postJson(route('auth.logout'))
        ->assertOk()
        ->assertJsonPath('message', 'Successfully logged out');
});
