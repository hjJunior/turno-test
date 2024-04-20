<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExpensePolicy
{
    use HandlesAuthorization;

    public function store(User $user, int $amount)
    {
        if ($user->bankAccount->getRawOriginal('balance') < $amount) {
            return $this->deny('Insufficient funds');
        }

        return true;
    }
}
