<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TransactionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        if ($user->bankAccount == null) {
            return $this->deny('You have no bank account');
        }

        return true;
    }
}
