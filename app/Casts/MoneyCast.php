<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class MoneyCast implements CastsAttributes
{
    public function get(Model $model, string $key, $value, array $attributes): float
    {
        return self::intToFloat($value);
    }

    public function set(Model $model, string $key, $value, array $attributes): float
    {
        return self::floatToInt($value);
    }

    public static function intToFloat($value)
    {
        return round(floatval($value) / 100, precision: 2);
    }

    public static function floatToInt($value)
    {
        return round(floatval($value) * 100);
    }
}
