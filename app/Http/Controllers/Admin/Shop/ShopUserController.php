<?php

namespace App\Http\Controllers\Admin\Shop;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\ShopCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ShopUserController extends Controller
{
    public function index(Shop $shop)
    {
        $buttons = [
            [
                'title' => 'Back',
                'url' => route('admin.shops.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ];

        PageHeader::set()->title('Shop User')->buttons($buttons);

        $users = $shop->users()->paginate(10);

        return Inertia::render('Admin/Shop/User/Index', [
            'users' => $users,
            'shop' => $shop,
        ]);
    }

    public function store(Shop $shop, Request $request)
    {
        $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['required', 'exists:users,id'],
        ]);

        DB::transaction(function () use ($shop, $request) {
            $users = User::whereIn('id', $request->user_ids)->get();
            foreach ($users as $user) {
                $user->shops()->attach($shop->id);
            }
        });

        return back()->with('success', 'Shop users updated successfully');
    }

    public function destroy(Shop $shop, User $user)
    {

        $user->shops()->detach($shop->id);

        return back()->with('success', 'User removed from shop successfully');
    }

    public function shopCategory()
    {

        $buttons = [
            [
                'title' => 'Add Category',
                'url' => route('admin.category.create'),
                'icon' => 'heroicons:plus',
            ],
        ];

        PageHeader::set()->title('Categories')->buttons($buttons);

        $categories = ShopCategory::orderBy('position', 'asc')->paginate();

        return Inertia::render('Admin/Shop/Category/Index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createShopCategory()
    {
        // PageHeader::set()->title('Create Category')->buttons(
        //     [
        //         [
        //             'title' => 'Back',
        //             'url' => route('admin.category.index'),
        //             'icon' => 'heroicons:chevron-left',
        //         ],
        //     ]
        // );

        PageHeader::set()->title('Create Category');

        return Inertia::render('Admin/Shop/Category/Create');
    }

    public function storeShopCategory(Request $request)
    {
        $shop = new ShopCategory();
        $shop->category = $request->category;

        // Check if position is provided from frontend
        if ($request->has('position')) {
            // Get the total number of categories
            $totalCategories = ShopCategory::count();

            // Check if requested position is valid
            if ($request->position > $totalCategories + 1) {
                return back()->withErrors(['position' => 'Invalid position. There are only ' . $totalCategories . ' categories available.']);
            }

            // If position is valid, handle position swapping
            $existingCategory = ShopCategory::where('position', $request->position)->first();
            if ($existingCategory) {
                // Shift all categories with position >= requested position one step up
                ShopCategory::where('position', '>=', $request->position)
                    ->increment('position');
            }
            $shop->position = $request->position;
        } else {
            // If no position provided, set it as the last position
            $lastPosition = ShopCategory::max('position');
            $shop->position = $lastPosition ? $lastPosition + 1 : 1; // Set to 1 if there are no records
        }

        if ($request->hasFile('img')) {
            $logoName = time() . '.' . $request->img->getClientOriginalExtension();
            $request->img->move(public_path('uploads/shops'), $logoName);
            $shop->img = '/uploads/shops/' . $logoName;
        }

        $shop->save();

        return to_route('admin.category.index')->with('success', 'Category created successfully');
    }

    public function editShopCategory($id)
    {
        // PageHeader::set()->title('Edit Category')->buttons(
        //     [
        //         [
        //             'title' => 'Back',
        //             'url' => route('admin.category.index'),
        //             'icon' => 'heroicons:chevron-left',
        //         ],
        //     ]
        // );

        PageHeader::set()->title('Update Category');

        $category = ShopCategory::find($id);

        return Inertia::render('Admin/Shop/Category/Edit', compact('category'));
    }

    public function updateShopCategory(Request $request)
    {
        // Get the total number of categories
        $totalCategories = ShopCategory::count();

        // Check if requested position is valid
        if ($request->position > $totalCategories) {
            return back()->withErrors(['position' => 'Invalid position. There are only ' . $totalCategories . ' categories available.']);
        }

        // Get the category to update
        $shop = ShopCategory::find($request->id);
        $shop->category = $request->category;

        // If the position is being updated
        if ($shop->position != $request->position) {
            // Check if any category exists in the new position and swap their positions
            $existingCategory = ShopCategory::where('position', $request->position)->first();

            if ($existingCategory) {
                // Swap the positions
                $existingCategory->position = $shop->position;
                $existingCategory->save();
            }

            // Assign the new position to the current category
            $shop->position = $request->position;
        }

        // Handle image file upload if present
        if ($request->hasFile('img')) {
            $logoName = time() . '.' . $request->img->getClientOriginalExtension();
            $request->img->move(public_path('uploads/shops'), $logoName);
            $shop->img = '/uploads/shops/' . $logoName;
        }

        $shop->save();

        return to_route('admin.category.index')->with('success', 'Category updated successfully');
    }

    public function deleteShopCategory(Request $request, ShopCategory $category, $id)
    {
        $category = ShopCategory::find($id);
        $category->delete();

        return to_route('admin.category.index')->with('success', 'Category deleted successfully');
    }

    public function filterShop(Request $request, Shop $shop)
    {
        PageHeader::set()->title('Shops');

        $search = $request->input('search');

        $shops = Shop::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('Admin/Shop/FilterResultPage', [
            'shops' => $shops,
            'search' => $search
        ]);
    }
}
