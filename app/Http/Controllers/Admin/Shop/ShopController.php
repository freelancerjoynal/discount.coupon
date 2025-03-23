<?php

namespace App\Http\Controllers\Admin\Shop;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Shop\StoreShopRequest;
use App\Http\Requests\Admin\Shop\UpdateShopRequest;
use App\Models\Shop;
use App\Models\ShopCategory;
use App\Models\ShopUser;
use App\Models\User;
use App\Traits\Uploader;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    use Uploader;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $overviews = [
            [
                'title' => 'Shops',
                // 'icon' => 'heroicons:user-group',
                'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-primary-500',
                'textColor' => 'text-slate-500',
                'value' => Shop::count(),
            ],
            [
                'title' => 'Active Shops',
                // 'icon' => 'heroicons:check',
                'iconBgColor' => 'bg-success-500 bg-opacity-20 text-success-500',
                'textColor' => 'text-slate-500',
                'value' => Shop::active()->count(),
            ],
            [
                'title' => 'Inactive Shops',
                // 'icon' => 'heroicons:exclamation-circle',
                'iconBgColor' => 'bg-danger-500 bg-opacity-20 text-danger-500',
                'textColor' => 'text-slate-500',
                'value' => Shop::inactive()->count(),
            ],
        ];

        $buttons = [
            [
                'title' => 'Add Shop',
                'url' => route('admin.shops.create'),
                'icon' => 'heroicons:plus',
            ],
        ];

        PageHeader::set()->title('Shops')->buttons($buttons);

        $shops = Shop::withCount('users as total_users')->OrderBy('position', 'asc')->paginate();

        $users = User::shop()
            ->select('id as value', 'name as label')
            ->latest()
            ->get();

        return Inertia::render('Admin/Shop/Index', compact('shops', 'overviews', 'users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // PageHeader::set()->title('New Shop')->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.shops.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        PageHeader::set()->title('Create New Shop');

        $users = User::shop()
            ->select('id as value', 'name as label')
            ->get();

        $category = ShopCategory::all();

        return Inertia::render('Admin/Shop/Create', compact('users', 'category'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShopRequest $request)
    {
        // dd($request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|unique:' . User::class,
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make('12345678'),
        ]);

        $user->assignRole('shop');

        $newShop = new Shop();
        $newShop->name = $user->name;
        $newShop->slug = Str::slug($user->name);
        $newShop->short_description = $request->short_description;
        $newShop->type = $request->type;

        // Handle shop position
        if ($request->has('position')) {
            // Check if position is valid (exists in database)
            $existingShop = Shop::where('position', $request->position)->first();
            if ($existingShop) {
                // Valid position, swap positions
                $lastPosition = Shop::max('position');
                $existingShop->position = $lastPosition + 1;
                $existingShop->save();
                $newShop->position = $request->position;
            } else {
                // Invalid position, set as last
                $lastPosition = Shop::max('position');
                $newShop->position = $lastPosition ? $lastPosition + 1 : 1;
            }
        } else {
            // No position provided, set as last
            $lastPosition = Shop::max('position');
            $newShop->position = $lastPosition ? $lastPosition + 1 : 1;
        }

        $newShop->save();

        $newShop->users()->attach($user->id);
        $shop = $newShop;

        if ($request->hasFile('image')) {
            // Get the file from the request
            $image = $request->file('image');

            // Define the upload path
            $uploadPath = 'uploads/shops';

            // Get the original filename and append a timestamp to ensure uniqueness
            $filename = time() . '_' . $image->getClientOriginalName();

            // Move the file to the public directory under uploads/shops
            $path = $image->move(public_path($uploadPath), $filename);

            // Store the file path in the database if needed
            $imagePath = $uploadPath . '/' . $filename;

            // Example of storing the path in the database
            $shop->image = $imagePath;
            $shop->save();
        }

        return to_route('admin.shops.index')->with('success', 'Shop created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        // PageHeader::set()->title($shop->name)->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.shops.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        PageHeader::set()->title('Shop Details');

        return Inertia::render('Admin/Shop/Show', compact('shop'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        // PageHeader::set()->title('Edit Shop')->buttons([
        //     [
        //         'title' => 'Back',
        //         'url' => route('admin.shops.index'),
        //         'icon' => 'heroicons:arrow-left',
        //     ],
        // ]);

        PageHeader::set()->title('Update Shop');

        $shopUser = ShopUser::where('shop_id', $shop->id)
            ->first();

        $user = User::where('id', $shopUser->user_id)
            ->first();

        // dd($user);

        $category = ShopCategory::all();

        return Inertia::render('Admin/Shop/Edit', compact('shop', 'user', 'category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $request->validate([
            'phone' => [
                'phone' => 'required',
                Rule::unique(User::class)->ignore($request->id),
            ],
        ]);

        // Handle shop position
        if ($request->has('position')) {
            // Check if position is valid (exists in database)
            $existingShop = Shop::where('position', $request->position)->first();
            if ($existingShop) {
                // Valid position, swap positions
                $oldPosition = $shop->position;
                $existingShop->position = $oldPosition;
                $existingShop->save();
                $shop->position = $request->position;
            } else {
                // Invalid position, set as last
                $lastPosition = Shop::max('position');
                $shop->position = $lastPosition ? $lastPosition + 1 : 1;
            }
        }

        $shop->update($request->validated());

        $user = User::where('id', $request->id)->first();
        $user->phone = $request->phone;
        $user->save();

        if ($request->user_id) {
            $shop->users()->sync($request->user_id);
        }

        return to_route('admin.shops.index')->with('success', 'Shop updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        $shop_user = ShopUser::where('shop_id', $shop->id)->first();
        $user = User::where('id', $shop_user->user_id)->first();

        $shop->users()->detach();
        $shop->delete();
        $user->delete();

        return back()->with('success', 'Shop deleted successfully');
    }

    public function filterShop(Request $request)
    {
        PageHeader::set()->title('Shops');

        $search = $request->input('search');

        $shops = Shop::withCount('users as total_users')
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate();

        return Inertia::render('Admin/Shop/FilterResultPage', [
            'shops' => $shops,
            'search' => $search
        ]);
    }
}
