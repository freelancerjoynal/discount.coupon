<?php

namespace App\Http\Controllers\Admin\Coupon;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Coupon as CP;
use App\Models\Coupon;
use App\Models\CouponUser;
use App\Models\Shop;
use App\Traits\Uploader;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;

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
                // 'icon' => 'heroicons:check',
                // 'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-green-500',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->active()->count(),
            ],
            [
                'title' => 'claimedCoupon',
                // 'icon' => 'heroicons:exclamation-circle',
                // 'iconBgColor' => 'bg-info-500 bg-opacity-20 text-info-500',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->inactive()->count(),
            ],
            [
                'title' => 'totalExpiredCoupon',
                // 'icon' => 'heroicons:squares-2x2-solid',
                // 'iconBgColor' => 'bg-danger-500 bg-opacity-20 text-gray-100',
                'textColor' => 'text-slate-500',
                'value' => Coupon::query()->expired()->count(),
            ],
            // [
            //     'title' => 'Total Used Coupons',
            //     'icon' => 'heroicons:user-group',
            //     'iconBgColor' => 'bg-success-500 bg-opacity-20 text-success-500',
            //     'textColor' => 'text-slate-500',
            //     'value' => CouponUser::query()->count(),
            // ],
        ];

        $buttons = [
            [
                'title' => 'createCoupon',
                'url' => route('admin.coupons.create'),
                'icon' => 'heroicons:plus',
            ],
        ];

        PageHeader::set()->title('dashboard')->buttons($buttons);

        $coupons = Coupon::with('shop:id,name')->withCount('couponUsers as total_purchased')->latest()->paginate();

        return Inertia::render('Admin/Coupon/Index', compact('coupons', 'overviews'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // PageHeader::set()->title('Coupons')->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.coupons.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        PageHeader::set()->title('Create Coupon');

        $shops = Shop::active()->select('id as value', 'name as label')->get();

        $couponCode = strtoupper(Str::random(10));

        return Inertia::render('Admin/Coupon/Create', compact('shops', 'couponCode'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CP\StoreCouponRequest $request)
    {

        Coupon::create($request->validated());

        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        // PageHeader::set()->title('Coupons')->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.coupons.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        // PageHeader::set()->title('Coupon');

        $coupon->load(['shop:id,name'])->withCount('couponUsers as total_purchased');

        return Inertia::render('Admin/Coupon/View', compact('coupon'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        // PageHeader::set()->title('Coupons Edit')->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.coupons.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        PageHeader::set()->title('Update Coupon');

        $shops = Shop::active()->select('id as value', 'name as label')->get();

        return Inertia::render('Admin/Coupon/Edit', [
            'coupon' => $coupon,
            'shops' => $shops,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CP\UpdateCouponRequest $request, Coupon $coupon)
    {

        $coupon->update($request->validated());

        return to_route('admin.coupons.index')->with('success', 'Coupon updated successfully');
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
            ->with('shop') // Eager load shop relationship
            ->when($search, function ($query, $search) {
                $search = strtolower($search);
                return $query->where(function($q) use ($search) {
                    $q->whereRaw('LOWER(code) LIKE ?', ["%{$search}%"])
                      ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"])
                      ->orWhereRaw('LOWER(short_description) LIKE ?', ["%{$search}%"])
                      ->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                      ->orWhereHas('shop', function($shopQuery) use ($search) {
                          $shopQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                      });
                });
            })
            ->paginate(10);

        return Inertia::render('Admin/Coupon/FilterResultPage', [
            'coupons' => $coupons,
            'search' => $search
        ]);
    }
}
