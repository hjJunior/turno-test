<?php

namespace App\Policies;

use App\Models\CheckDeposit;
use App\Models\User;
use App\States\CheckDepositStatus\Accepted;
use App\States\CheckDepositStatus\Rejected;
use Illuminate\Auth\Access\HandlesAuthorization;

class CheckDepositPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return true;
    }

    public function accept(User $user, CheckDeposit $checkDeposit)
    {
        if (! $user->is_admin) {
            return $this->deny('Only admins can accept check deposit');
        }

        if (! $checkDeposit->state->canTransitionTo(Accepted::class)) {
            return $this->deny('You cannot perform this operation');
        }

        return true;
    }

    public function reject(User $user, CheckDeposit $checkDeposit)
    {
        if (! $user->is_admin) {
            return $this->deny('Only admins can accept check deposit');
        }

        if (! $checkDeposit->state->canTransitionTo(Rejected::class)) {
            return $this->deny('You cannot perform this operation');
        }

        return true;
    }
}
