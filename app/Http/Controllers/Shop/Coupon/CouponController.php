<?php

namespace App\Http\Controllers\Shop\Coupon;

use App\Models\Shop;
use Inertia\Inertia;
use App\Models\Coupon;
use App\Traits\Uploader;
use App\Models\CouponUser;
use App\Helpers\PageHeader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\Coupon\StoreCouponRequest;
use App\Http\Requests\Admin\Coupon\UpdateCouponRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CouponController extends Controller
{
    use Uploader;

    /**
     * Display a listing of the resource.
     */
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

        $overviews = [
            [
                'title' => 'unclaimedCoupon',
                'icon' => 'heroicons:check',
                'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-green-500',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->forUser(auth()->user()->id)->active()->count()

            ],
            [
                'title' => 'claimedCoupon',
                'icon' => 'heroicons:exclamation-circle',
                'iconBgColor' => 'bg-info-500 bg-opacity-20 text-info-500',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->forUser(auth()->user()->id)->inactive()->count(),
            ],
            [
                'title' => 'totalExpiredCoupon',
                'icon' => 'heroicons:squares-2x2-solid',
                'iconBgColor' => 'bg-danger-500 bg-opacity-20 text-gray-100',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->forUser(auth()->user()->id)->expired()->count(),
            ],
        ];

        $buttons = [
            [
                'title' => 'createCoupon',
                'url' => route('shop.coupons.create'),
                'icon' => 'heroicons:plus',
            ],
        ];

        PageHeader::set()->title('dashboard');

        $coupons = Coupon::whereHas('shop', function ($q) {
            $q->whereHas('users', function ($q) {
                $q->where('user_id', auth()->user()->id);
            });
        })->with('shop:id,name')->withCount('couponUsers as total_purchased')->latest()->paginate();

        // Fetch user details
        $user = Auth::user();

        // Fetch user's shop
        $shop = $user->shops()->first();


        return Inertia::render('Shop/Coupon/Index', compact('coupons', 'overviews', 'user', 'shop'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        PageHeader::set()->title('Coupons')->buttons([
            [
                'title' => 'Back',
                'url' => route('shop.coupons.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ]);

        return Inertia::render('Shop/Coupon/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponRequest $request)
    {
        Coupon::create($request->validated());

        return redirect()->route('shop.coupons.index')->with('success', 'Coupon created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        PageHeader::set()->title('Coupons')->buttons([
            [
                'title' => 'Back',
                'url' => route('shop.coupons.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ]);

        $coupon->load(['shop:id,name'])->withCount('couponUsers as total_purchased');

        return Inertia::render('Shop/Coupon/View', compact('coupon'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        PageHeader::set()->title('Coupons Edit')->buttons([
            [
                'title' => 'Back',
                'url' => route('shop.coupons.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ]);

        return Inertia::render('Shop/Coupon/Edit', [
            'coupon' => $coupon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {

        $coupon->update($request->validated());

        return to_route('shop.coupons.index')->with('success', 'Coupon updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        if ($coupon->image) {
            $this->delete($coupon->image);
        }
        $coupon->delete();

        return redirect()->back()->with('success', 'Coupon deleted successfully');
    }

    public function filterCoupon(Request $request)
    {
        PageHeader::set()->title('Coupons');

        $search = $request->input('search');

        $coupons = Coupon::query()
            // ->where('shop_id', auth()->user()->shop->id)
            ->when($search, function ($query, $search) {
                return $query->where('code', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('Shop/Coupon/FilterResultPage', [
            'coupons' => $coupons,
            'search' => $search
        ]);
    }
}
