<?php

namespace App\Http\Controllers\Admin\Coupon;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\CouponUser;
use Inertia\Inertia;

class CouponUserController extends Controller
{
    public function couponUsers(Coupon $coupon)
    {
        $overviews = [
            [
                'title' => 'Total Coupon Usage',
                'icon' => 'heroicons:check',
                'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-green-500',
                'textColor' => 'text-slate-500',
                'value' => $coupon->couponUsers()->count(),
            ],
            [
                'title' => 'Total Claimed',
                'icon' => 'heroicons:exclamation-circle',
                'iconBgColor' => 'bg-info-500 bg-opacity-20 text-info-500',
                'textColor' => 'text-slate-500',
                'value' => $coupon->couponUsers()->sum('used'),
            ],
        ];

        $buttons = [
            [
                'title' => 'Back',
                'url' => route('admin.coupons.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ];

        PageHeader::set()->title('Coupon User')->buttons($buttons);

        $coupons = $coupon->couponUsers()->with('user:id,name,phone', 'coupon:id,code')->paginate();

        return Inertia::render('Admin/Coupon/User/Index', compact('coupons', 'overviews'));
    }

    public function userClaims(Coupon $coupon, CouponUser $couponUser)
    {
        if ($couponUser->coupon_id !== $coupon->id) {
            return response()->json([]);
        }

        $claims = $couponUser->claims()->paginate();

        return response()->json($claims);
    }
}
