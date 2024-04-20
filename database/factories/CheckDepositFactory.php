<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\Models\Transaction;
use App\Models\User;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Pending;
use App\States\CheckDepositStatus\Rejected;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CheckDeposit>
 */
class CheckDepositFactory extends Factory
{
    public function definition(): array
    {
        return [
            'description' => $this->faker->numerify('Check description ####'),
            'amount' => 100,
            'bank_account_id' => BankAccount::factory(),
            'user_id' => User::factory(),
            'state' => Pending::class,
            'picture' => 'fake-picture.png',
        ];
    }

    public function accepted(): self
    {
        return $this
            ->state(['state' => Accepted::class])
            ->has(Transaction::factory());
    }

    public function rejected(): self
    {
        return $this->state(['state' => Rejected::class]);
    }
}
