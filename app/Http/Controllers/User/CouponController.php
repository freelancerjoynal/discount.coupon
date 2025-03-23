<?php

namespace App\Http\Controllers\User;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class CouponController extends Controller
{
    public function index()
    {
        // Get the current date and time
        $now = Carbon::now();

        // Get coupons where status is 2 (Claimed) and claimed_at is older than 48 hours
        $couponsToUpdate = Coupon::where('status', 2)
            ->where('claimed_at', '<', $now->subHours(48))
            // ->where('claimed_at', '<', $now->subMinutes(10))
            ->get();

        // dd($couponsToUpdate);

        // Update the status to 3 (Expired) for each coupon
        foreach ($couponsToUpdate as $coupon) {
            $coupon->status = 3;
            $coupon->save();
        }

        $user = \request()->user();

        $query = $user->couponUsers();
        // dd($query->where('status', 1)->count());
        $overviews = [
            [
                'title' => 'claimedCoupon',
                'icon' => 'heroicons:exclamation-circle',
                'iconBgColor' => 'bg-info-500 bg-opacity-20 text-info-500',
                'textColor' => 'text-slate-500',
                'value' => $query->where('status', 1)->count(),
            ],
            [
                'title' => 'verifiedCoupon',
                'icon' => 'heroicons:check',
                'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-green-500',
                'textColor' => 'text-slate-500',
                'value' => $query->where('status', 0)->count(),
            ],
        ];

        // $buttons = [
        //     [
        //         'title' => 'Get Coupon',
        //         'url' => '/#shops',
        //         'icon' => 'heroicons:plus',
        //     ],
        // ];

        // PageHeader::set()->title('Coupons')->buttons($buttons);
        PageHeader::set()->title('coupons');

        $coupons = $user->couponUsers()
            ->with(['coupon', 'claimForUser' => function ($q) {
                $q->with('user');
            }])->paginate();

        return inertia('User/Dashboard/Coupon/Index', compact('coupons', 'overviews', 'user'));
    }

    public function show($code)
    {
        $coupon = Coupon::active()->where('code', $code)->firstOrFail();

        return inertia('User/Frontend/Checkout', compact('coupon'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'coupon_code' => ['required', 'string'],
        ]);

        $coupon = Coupon::active()->where('code', $request->coupon_code)->first();

        try {
            DB::beginTransaction();
            if (!$coupon) {
                throw new \Exception('Coupon not found');
            }

            $user = auth()->user();

            $phone_number_usage_count = $user->couponUsers()->where('created_at', '>=', now()->subDay())->count();

            if ($phone_number_usage_count >= $coupon->daily_limit) {
                throw new \Exception('Daily limit exceeded');
            }

            // check if user not has role as user than assign role as user
            if (!$user->hasRole('user')) {
                $user->assignRole('user');
            }

            $coupon->users()->attach($user->id, [
                'created_at' => now(),
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()->with('error', $th->getMessage());
        }

        return inertia('User/Frontend/Success', compact('coupon'));
    }

    public function filterCoupon(Request $request)
    {
        PageHeader::set()->title('Coupons');

        $search = $request->input('search');

        $coupons = Coupon::query()
            ->whereHas('couponUsers', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->when($search, function ($query, $search) {
                return $query->where('code', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('User/Dashboard/Coupon/FilterResultPage', [
            'coupons' => $coupons,
            'search' => $search
        ]);
    }
}
