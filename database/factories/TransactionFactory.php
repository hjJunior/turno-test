<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\Models\CheckDeposit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'bank_account_id' => BankAccount::factory(),
            'transactionable_id' => CheckDeposit::factory(),
            'transactionable_type' => CheckDeposit::class,
            'amount' => $this->faker->numberBetween(100, 200),
            'description' => $this->faker->numerify('Check description ####'),
        ];
    }
}
