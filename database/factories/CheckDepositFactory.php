<?php

namespace Database\Factories;

use App\Models\BankAccount;
use App\States\CheckDepositStatus\Pending;
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
            'state' => Pending::class,
            'picture' => 'fake-picture.png',
        ];
    }
}
