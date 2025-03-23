<?php

namespace App\Http\Controllers\User\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\ShopCategory;
use App\Models\SocialIcon;
use App\Models\AboutSection;
use App\Models\ContactUs;
use App\Models\CouponUser;
use App\Models\favoritShop;
use App\Models\Note;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function index()
    {
        $shopCategory = ShopCategory::orderBy('position', 'asc')->get();
        // Join shops with shop_categories to get the category image
        $shopsByCategory = Shop::select('type', DB::raw('count(*) as total'), 'shop_categories.img')
            ->join('shop_categories', 'shops.type', '=', 'shop_categories.category')
            ->orderBy('shop_categories.position', 'asc')
            ->groupBy('type', 'shop_categories.img')
            ->get();



        $allShops = Shop::all();

        // Map categories with their respective shops and images
        $shops = $shopsByCategory->map(function ($category) use ($allShops) {
            $category->shops = $allShops->where('type', $category->type)->values();
            return $category;
        });

        $socials = SocialIcon::all();
        $isLoggedIn = auth()->check();
        $userId = auth()->id();
        $favoriteShop = [];
        $favoriteShopCount = 0;

        if ($userId) {
            $favoriteShop = favoritShop::with('shop')->where('user_id', $userId)->get();
            $favoriteShopCount = favoritShop::where('user_id', $userId)->count();
        }

        $AboutSection = AboutSection::first();
        $welcome = $AboutSection->welcome;
        $about = $AboutSection->about;
        $contact = ContactUs::get();

        $coupons = Coupon::with('shop')
            ->where('status', true)
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        $note = Note::first();

        return inertia('User/Frontend/Home/Index', compact('shopCategory', 'shops', 'socials', 'isLoggedIn', 'favoriteShop', 'favoriteShopCount', 'welcome', 'about', 'contact', 'coupons', 'note'));
    }

    public function updateExpiredClaims()
    {
        try {
            // Get current time
            $now = now();

            // Update expired claims by joining with coupons table
            $updatedCount = DB::table('coupon_users')
                ->join('coupons', 'coupon_users.coupon_id', '=', 'coupons.id')
                ->where('coupons.valid_to', '<', $now)
                ->where('coupon_users.status', 1)
                ->update(['coupon_users.status' => 0]);

            return response()->json([
                'success' => true,
                'message' => 'Expired claims updated successfully',
                'updated_count' => $updatedCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating expired claims: ' . $e->getMessage()
            ], 500);
        }
    }
}
