<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ShopCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table(table: 'shop_categories')->insert([
            [
                'position' => 1,
                'category' => 'Bureau De Changes',
                'img' => '/uploads/shops/1717677624_4817185181771.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 2,
                'category' => 'Beauty Clinics',
                'img' => '/uploads/shops/1717677584_4667715435032.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 3,
                'category' => 'Cafes',
                'img' => '/uploads/shops/1717677535_3167336752503.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 4,
                'category' => 'Clubs',
                'img' => '/uploads/shops/1717677517_2830326499424.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 5,
                'category' => 'Dentists',
                'img' => '/uploads/shops/1717677465_1355346801145.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 6,
                'category' => 'Electronics',
                'img' => '/uploads/shops/1717677408_3380578362076.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 7,
                'category' => 'Flower Shops',
                'img' => '/uploads/shops/1717677392_1210557779247.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 8,
                'category' => 'Gifts',
                'img' => '/uploads/shops/1717677335_247283267218.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 9,
                'category' => 'Hotels',
                'img' => '/uploads/shops/1717677320_2132862738769.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 10,
                'category' => 'Lady’s Hairdressers',
                'img' => '/uploads/shops/1717677054_18604883720410.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 11,
                'category' => 'Men’s Clothing',
                'img' => '/uploads/shops/1717676998_5964223467111.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 12,
                'category' => 'Men’s Hairdressers',
                'img' => '/uploads/shops/1717676960_36271097810212.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 13,
                'category' => 'Mobile Phone Shops',
                'img' => '/uploads/shops/1717676901_16113227499713.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 14,
                'category' => 'Opticians',
                'img' => '/uploads/shops/1717676817_23475182508215.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 15,
                'category' => 'Restaurants',
                'img' => '/uploads/shops/1717676800_46808809423714.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 16,
                'category' => 'Shoe Shops',
                'img' => '/uploads/shops/1717676776_24378214894216.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 17,
                'category' => 'Sports centres',
                'img' => '/uploads/shops/1717676764_53982912177617.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 18,
                'category' => 'Super markets',
                'img' => '/uploads/shops/1717676745_37111748650018.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 19,
                'category' => 'Tobacconists',
                'img' => '/uploads/shops/1717676423_34016157725419.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 20,
                'category' => 'Travel Agents',
                'img' => '/uploads/shops/1717676433_24503242073020.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'position' => 21,
                'category' => 'Women’s Clothing',
                'img' => '/uploads/shops/1717676386_6004202181021.jpg',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}