<?php

use App\Models\BankAccount;
use App\Models\CheckDeposit;
use App\Models\Expense;
use App\Models\Transaction;
use App\Models\User;
use App\States\CheckDepositStatus\Pending;

use function Pest\Laravel\actingAs;

test('customer can list your transactions', function () {
    $bankAccount = BankAccount::factory()
        ->has(Transaction::factory())
        ->has(Transaction::factory()->expense())
        ->create();
    $user = $bankAccount->user;
    $checkDeposit = CheckDeposit::first();
    $expense = Expense::first();

    actingAs($user)
        ->getJson(route('transactions.index'))
        ->assertOk()
        ->assertJsonCount(2, 'data')
        // first
        ->assertJsonPath('data.0.transactionable.id', $checkDeposit->id)
        ->assertJsonPath('data.0.transactionable.state', Pending::class)
        ->assertJsonPath('data.0.transactionable.description', $checkDeposit->description)
        ->assertJsonPath('data.0.transactionable.amount', $checkDeposit->getRawOriginal('amount'))
        ->assertJsonPath('data.0.transactionable.picture', Storage::url($checkDeposit->picture))
        // second
        ->assertJsonPath('data.1.transactionable.id', $expense->id)
        ->assertJsonPath('data.1.transactionable.description', $expense->description)
        ->assertJsonPath('data.1.transactionable.amount', $expense->getRawOriginal('amount'));
});

test('cannot list transactions for users without bank account', function () {
    actingAs(User::factory()->create())
        ->getJson(route('transactions.index'))
        ->assertForbidden()
        ->assertJsonPath('message', 'You have no bank account');
});

test('paginates 15 by page', function () {
    $bankAccount = BankAccount::factory()
        ->has(Transaction::factory()->count(16))
        ->create();
    $user = $bankAccount->user;

    actingAs($user)
        ->getJson(route('transactions.index'))
        ->assertOk()
        ->assertJsonCount(15, 'data')
        ->assertJsonPath('meta.current_page', 1)
        ->assertJsonPath('meta.last_page', 2)
        ->assertJsonPath('meta.per_page', 15)
        ->assertJsonPath('meta.total', 16);

    actingAs($user)
        ->getJson(route('transactions.index', ['page' => 2]))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('meta.current_page', 2)
        ->assertJsonPath('meta.last_page', 2)
        ->assertJsonPath('meta.per_page', 15)
        ->assertJsonPath('meta.total', 16);
});

describe('filter', function () {
    describe('by transactionable type', function () {
        beforeEach(function () {
            $bankAccount = BankAccount::factory()
                ->has(Transaction::factory())
                ->has(Transaction::factory()->expense())
                ->create();
            $this->user = $bankAccount->user;
            $this->checkDeposit = CheckDeposit::first();
            $this->expense = Expense::first();
        });

        it('can filter check deposits', function () {
            $filter = ['type' => CheckDeposit::class];

            actingAs($this->user)
                ->getJson(route('transactions.index', ['filter' => $filter]))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.transactionable.id', $this->checkDeposit->id)
                ->assertJsonPath('data.0.transactionable_type', CheckDeposit::class);
        });

        it('can filter expense', function () {
            $filter = ['type' => Expense::class];

            actingAs($this->user)
                ->getJson(route('transactions.index', ['filter' => $filter]))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.transactionable.id', $this->expense->id)
                ->assertJsonPath('data.0.transactionable_type', Expense::class);
        });
    });
});
