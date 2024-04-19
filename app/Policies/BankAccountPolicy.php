<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BankAccountPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        if ($user->bankAccount != null) {
            return $this->deny('You can have only one bank account');
        }

        return true;
    }
}
