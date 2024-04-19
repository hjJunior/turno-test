<?php

use App\Casts\MoneyCast;
use App\Models\User;

describe('MoneyCast', function () {
    describe('.get', function () {
        it('returns float number')
            ->expect((new MoneyCast())->get(new User, 'balance', 50, []))
            ->toEqual(0.5);
    });

    describe('.set', function () {
        it('returns cents')
            ->expect((new MoneyCast())->set(new User, 'balance', 0.5, []))
            ->toEqual(50);
    });

    describe('#intToFloat', function () {
        it('converts cents to float')
            ->expect(MoneyCast::intToFloat(50))
            ->toEqual(0.5);
    });

    describe('#floatToInt', function () {
        it('converts float to int')
            ->expect(MoneyCast::floatToInt(0.5))
            ->toEqual(50);
    });
});
