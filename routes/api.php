<?php

use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\CheckDepositController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', fn () => auth()->user());
    Route::apiResource('bank-accounts', BankAccountController::class)->only('store');
    Route::apiResource('check-deposits', CheckDepositController::class)->only('index', 'store');
});
