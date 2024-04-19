<?php

namespace App\States\CheckDepositStatus;

use Spatie\ModelStates\State;
use Spatie\ModelStates\StateConfig;

abstract class CheckDepositStatus extends State
{
    public static function config(): StateConfig
    {
        return parent::config()
            ->default(Pending::class)
            ->allowTransition(Pending::class, Accepted::class)
            ->allowTransition(Pending::class, Rejected::class);
    }
}
