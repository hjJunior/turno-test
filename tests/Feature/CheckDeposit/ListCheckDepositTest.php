<?php

use App\Models\CheckDeposit;
use App\Models\User;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Pending;
use App\States\CheckDepositStatus\Rejected;

use function Pest\Laravel\actingAs;

test('customer can list your check deposits', function () {
    $user = User::factory()->has(CheckDeposit::factory())->create();
    $checkDeposit = $user->checkDeposits()->first();

    CheckDeposit::factory()->create();

    actingAs($user)
        ->getJson(route('check-deposits.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonMissingPath('data.0.user')
        ->assertJsonPath('data.0.id', $checkDeposit->id)
        ->assertJsonPath('data.0.state', Pending::class)
        ->assertJsonPath('data.0.description', $checkDeposit->description)
        ->assertJsonPath('data.0.amount', $checkDeposit->getRawOriginal('amount'))
        ->assertJsonPath('data.0.picture', Storage::url($checkDeposit->picture));
});

test('admin can list all check deposits with user property', function () {
    $user = User::factory()->admin()->create();
    // todo: maybe a bug on laravel factories?
    // without 'fresh', the getRawOriginal returns the casted value instead of database value
    $checkDeposit1 = CheckDeposit::factory()->create()->fresh();
    $checkDeposit2 = CheckDeposit::factory()->create()->fresh();

    actingAs($user)
        ->getJson(route('check-deposits.index'))
        ->assertOk()
        ->assertJsonCount(2, 'data')
        // first
        ->assertJsonPath('data.0.id', $checkDeposit1->id)
        ->assertJsonPath('data.0.state', Pending::class)
        ->assertJsonPath('data.0.description', $checkDeposit1->description)
        ->assertJsonPath('data.0.amount', $checkDeposit1->getRawOriginal('amount'))
        ->assertJsonPath('data.0.picture', Storage::url($checkDeposit1->picture))
        ->assertJsonPath('data.0.user.id', $checkDeposit1->user->id)
        ->assertJsonPath('data.0.user.name', $checkDeposit1->user->name)
        ->assertJsonPath('data.0.user.email', $checkDeposit1->user->email)
        ->assertJsonPath('data.0.user.username', $checkDeposit1->user->username)
        // second
        ->assertJsonPath('data.1.id', $checkDeposit2->id)
        ->assertJsonPath('data.1.state', Pending::class)
        ->assertJsonPath('data.1.description', $checkDeposit2->description)
        ->assertJsonPath('data.1.amount', $checkDeposit2->getRawOriginal('amount'))
        ->assertJsonPath('data.1.picture', Storage::url($checkDeposit2->picture))
        ->assertJsonPath('data.1.user.id', $checkDeposit2->user->id)
        ->assertJsonPath('data.1.user.name', $checkDeposit2->user->name)
        ->assertJsonPath('data.1.user.email', $checkDeposit2->user->email)
        ->assertJsonPath('data.1.user.username', $checkDeposit2->user->username);
});

test('paginates 15 by page', function () {
    $user = User::factory()->has(CheckDeposit::factory()->count(16))->create();

    actingAs($user)
        ->getJson(route('check-deposits.index'))
        ->assertOk()
        ->assertJsonCount(15, 'data')
        ->assertJsonPath('meta.current_page', 1)
        ->assertJsonPath('meta.last_page', 2)
        ->assertJsonPath('meta.per_page', 15)
        ->assertJsonPath('meta.total', 16);

    actingAs($user)
        ->getJson(route('check-deposits.index', ['page' => 2]))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('meta.current_page', 2)
        ->assertJsonPath('meta.last_page', 2)
        ->assertJsonPath('meta.per_page', 15)
        ->assertJsonPath('meta.total', 16);
});

describe('filter', function () {
    describe('by state', function () {
        beforeEach(function () {
            $this->user = User::factory()->admin()->create();
            $this->pending = CheckDeposit::factory()->create();
            $this->accepted = CheckDeposit::factory()->accepted()->create();
            $this->rejected = CheckDeposit::factory()->rejected()->create();
        });

        it('can filter pending', function () {
            $filter = ['state' => Pending::class];

            actingAs($this->user)
                ->getJson(route('check-deposits.index', ['filter' => $filter]))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $this->pending->id)
                ->assertJsonPath('data.0.state', Pending::class);
        });

        it('can filter accepted', function () {
            $filter = ['state' => Accepted::class];

            actingAs($this->user)
                ->getJson(route('check-deposits.index', ['filter' => $filter]))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $this->accepted->id)
                ->assertJsonPath('data.0.state', Accepted::class);
        });

        it('can filter rejected', function () {
            $filter = ['state' => Rejected::class];

            actingAs($this->user)
                ->getJson(route('check-deposits.index', ['filter' => $filter]))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $this->rejected->id)
                ->assertJsonPath('data.0.state', Rejected::class);
        });
    });
});
