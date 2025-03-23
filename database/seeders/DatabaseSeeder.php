<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // user with permission seeder
        $this->call(UserPermissionSeeder::class);
        $this->call(CountryCodeSeeder::class);
        $this->call(CountryCodeSeeder::class);
        $this->call(ShopCategorySeeder::class);
    }
}