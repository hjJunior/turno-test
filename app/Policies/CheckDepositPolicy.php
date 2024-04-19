<?php

namespace App\Policies;

use App\Models\User;

class CheckDepositPolicy
{
    public function store(User $user)
    {
        return true;
    }
}
