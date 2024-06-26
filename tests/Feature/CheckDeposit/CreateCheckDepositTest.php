<?php

use App\Models\BankAccount;
use App\Models\User;
use App\States\CheckDepositStatus\Pending;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\freezeSecond;
use function Pest\Laravel\postJson;

test('a user can create a check deposit to its account', function () {
    freezeSecond();
    Storage::fake();

    $user = User::factory()->has(BankAccount::factory())->create();
    $bankAccountId = $user->bankAccount->id;
    $picture = UploadedFile::fake()->image('deposit.png');

    $payload = [
        'description' => "Grandma's gift",
        'amount' => 10.50,
        'bank_account_id' => $bankAccountId,
        'picture' => $picture,
    ];

    actingAsApiUser($user)
        ->postJson(route('check-deposits.store'), $payload)
        ->assertCreated()
        ->assertJsonPath('data.state', Pending::class)
        ->assertJsonPath('data.description', "Grandma's gift")
        ->assertJsonPath('data.amount', 1050)
        ->assertJsonPath('data.picture', Storage::temporaryUrl("check-deposits/{$picture->hashName()}", now()->addHour()));

    assertDatabaseHas('check_deposits', [
        'description' => "Grandma's gift",
        'amount' => 1050,
        'bank_account_id' => $bankAccountId,
        'user_id' => $user->id,
    ]);

    assertDatabaseCount('check_deposits', 1);

    Storage::assertExists("/check-deposits/{$picture->hashName()}");
});

test('a user can create a check deposit to another bank account', function () {
    freezeSecond();
    Storage::fake();

    $user = User::factory()->create();
    $bankAccountId = BankAccount::factory()->create()->id;
    $picture = UploadedFile::fake()->image('deposit.png');

    $payload = [
        'description' => "Grandma's gift",
        'amount' => 10.50,
        'bank_account_id' => $bankAccountId,
        'picture' => $picture,
        'user_id' => $user->id,
    ];

    actingAsApiUser($user)
        ->postJson(route('check-deposits.store'), $payload)
        ->assertCreated()
        ->assertJsonPath('data.state', Pending::class)
        ->assertJsonPath('data.description', "Grandma's gift")
        ->assertJsonPath('data.amount', 1050)
        ->assertJsonPath('data.picture', Storage::temporaryUrl("check-deposits/{$picture->hashName()}", now()->addHour()));

    assertDatabaseHas('check_deposits', [
        'description' => "Grandma's gift",
        'amount' => 1050,
        'bank_account_id' => $bankAccountId,
    ]);

    assertDatabaseCount('check_deposits', 1);

    Storage::assertExists("/check-deposits/{$picture->hashName()}");
});

test('needs to be authenticated', function () {
    postJson(route('check-deposits.store'))
        ->assertUnauthorized();
});

test('validates payload', function () {
    $user = User::factory()->create();

    $payload = [
        'description' => null,
        'amount' => -1,
        'bank_account_id' => '10',
    ];

    actingAsApiUser($user)
        ->postJson(route('check-deposits.store'), $payload)
        ->assertUnprocessable()
        ->assertJsonValidationErrors([
            'description' => [
                'The description field is required.',
            ],
            'amount' => [
                'The amount field must be greater than 0.',
            ],
            'bank_account_id' => [
                'The selected bank account id is invalid.',
            ],
            'picture' => [
                'The picture field is required.',
            ],
        ]);

    assertDatabaseCount('check_deposits', 0);
});
