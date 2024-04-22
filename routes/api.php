<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\CheckDepositController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\RefreshToken;

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

Route::prefix('auth')
    ->name('auth.')
    ->controller(AuthController::class)
    ->group(function ($router) {
        Route::post('login', 'login')->name('login');
        Route::post('logout', 'logout')->name('logout');
        Route::get('me', 'me')->name('me');
    });

Route::apiResource('users', UserController::class)->only('store');

Route::middleware(['auth:api', RefreshToken::class])
    ->group(function () {
        Route::apiResource('bank-accounts', BankAccountController::class)->only('store');
        Route::apiResource('expenses', ExpenseController::class)->only('store');
        Route::apiResource('transactions', TransactionController::class)->only('index');
        Route::apiResource('check-deposits', CheckDepositController::class)->only('index', 'store');
        Route::name('check-deposits.')
            ->prefix('/check-deposits/{check_deposit}')
            ->controller(CheckDepositController::class)
            ->group(function () {
                Route::post('/accept', 'accept')->name('accept');
                Route::post('/reject', 'reject')->name('reject');
            });
    });
