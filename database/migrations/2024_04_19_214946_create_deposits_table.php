<?php

use App\States\CheckDepositStatus\Pending;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('check_deposits', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->integer('amount');
            $table->foreignId('bank_account_id')->constrained();
            $table->string('state')->default(Pending::class);
            $table->string('picture');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('check_deposits');
    }
};
