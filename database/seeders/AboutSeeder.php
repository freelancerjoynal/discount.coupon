<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $about = new AboutSection();
        $about->welcome = 'Never pay full price... We have free coupons, for everything!';
        $about->about = 'About text';
        $about->save();
    }
}
