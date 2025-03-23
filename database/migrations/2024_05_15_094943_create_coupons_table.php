<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('code')->unique();

            $table->enum('discount_type', ['fixed', 'percentage'])->default('fixed');
            $table->float('discount')->default(0);

            $table->unsignedInteger('daily_limit')->default(1);
            $table->float('price')->default(0);
            $table->unsignedInteger('usage_limit')->default(1);

            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_to')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamp('claimed_at')->default(true);
            $table->timestamp('verified_at')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
