<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\Models\CheckDeposit;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    public function definition(): array
    {
        $description = $this->faker->numerify('Check description ####');

        return [
            'bank_account_id' => BankAccount::factory(),
            'transactionable_id' => CheckDeposit::factory()->state(compact('description')),
            'transactionable_type' => CheckDeposit::class,
            'amount' => $this->faker->numberBetween(100, 200),
            'description' => $description,
        ];
    }

    public function expense(): self
    {
        $description = $this->faker->numerify('Expense description ####');

        return $this->state([
            'transactionable_id' => Expense::factory()->state(compact('description')),
            'transactionable_type' => Expense::class,
            'description' => $description,
        ]);
    }
}
