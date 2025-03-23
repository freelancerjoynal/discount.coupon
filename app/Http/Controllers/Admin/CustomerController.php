<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CouponUser;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Helpers\PageHeader;

class CustomerController extends Controller
{
    public function filterCustomer(Request $request)
    {
        PageHeader::set()->title('Customers');

        $search = $request->input('search');

        $customers = User::user()
            ->select([
                'users.*',
                DB::raw('(SELECT COUNT(*) FROM coupon_users WHERE coupon_users.user_id = users.id) as total_claims'),
                DB::raw('(SELECT COUNT(*) FROM coupon_users WHERE coupon_users.user_id = users.id AND coupon_users.used > 0) as verified_claims'),
                DB::raw('(SELECT COUNT(*) FROM login_histories WHERE login_histories.user_id = users.id) as login_count')
            ])
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->withCount(['couponUsers as active_claims' => function ($query) {
                $query->where('status', true)
                    ->whereHas('coupon', function ($q) {
                        $q->where('valid_to', '>', now());
                    });
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Customer/FilterResultPage', [
            'customers' => $customers,
            'search' => $search
        ]);
    }

    public function index()
    {
        $customers = User::user()
            ->select([
                'users.*',
                DB::raw('(SELECT COUNT(*) FROM coupon_users WHERE coupon_users.user_id = users.id) as total_claims'),
                DB::raw('(SELECT COUNT(*) FROM coupon_users WHERE coupon_users.user_id = users.id AND coupon_users.used > 0) as verified_claims'),
                DB::raw('(SELECT COUNT(*) FROM login_histories WHERE login_histories.user_id = users.id) as login_count')
            ])
            ->withCount(['couponUsers as active_claims' => function ($query) {
                $query->where('status', true)
                    ->whereHas('coupon', function ($q) {
                        $q->where('valid_to', '>', now());
                    });
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Customer/Index', [
            'customers' => $customers
        ]);
    }

    public function update(Request $request, User $customer)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $customer->id,
                'phone' => 'required|string|max:20'
            ]);

            DB::beginTransaction();
            $customer->update($validated);
            DB::commit();

            return redirect()->back()->with('success', 'Customer updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to update customer: ' . $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|unique:' . User::class,
                'password' => 'required|string|min:8'
            ]);

            DB::beginTransaction();
            $customer = User::create([

                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => '+964' . $request->phone,
                'password' => Hash::make($request->password),
                'otp_verified' => 'not',
                'user_type' => 'user',
            ]);
            $customer->assignRole('user');
            DB::commit();

            return redirect()->back()->with('success', 'Customer created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create customer');
        }
    }

    public function destroy(User $customer)
    {
        try {
            DB::beginTransaction();
            $customer->delete();
            DB::commit();

            return redirect()->back()->with('success', 'Customer deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to delete customer: ' . $e->getMessage());
        }
    }
}
