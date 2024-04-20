<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('check_deposits', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
        });
    }

    public function down(): void
    {
        Schema::table('check_deposits', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
};