<?php

namespace App\Http\Controllers\Shop;

use App\Models\Shop;
use App\Models\User;
use Inertia\Inertia;
use App\Helpers\PageHeader;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Shop\UpdateProfileRequest;
use App\Models\ShopCategory;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $shop = Shop::withUser($user->id)->first();

        if (\is_null($shop)) {
            $newShop = new Shop();
            $newShop->name = $user->name;
            $newShop->slug = Str::slug($user->name);
            $newShop->save();

            $newShop->users()->attach($user->id);
            $shop = $newShop;
        }

        PageHeader::set()->title('Shop Update')->buttons([
            [
                'title' => 'shop Update',
                'url' => route('shop.profile.index'),
                'icon' => 'heroicons:user-plus',
            ],
        ]);

        $category = ShopCategory::all();

        return Inertia::render('Shop/Profile/Update', compact('shop', 'category'));
    }
    public function changeCredentialView()
    {
        PageHeader::set()->title('Change Password')->buttons([
            [
                'title' => 'Change Password',
                'url' => route('shop.change-password.store'),
                'icon' => 'heroicons:edit',
            ],
        ]);
        $user = auth()->user();
        return inertia('Shop/Profile/ChangeCredential', \compact('user'));
    }

    public function changePassword(Request $request)
    {
        $this->validate($request,  [
            'password' => 'required|confirmed|min:6'
        ]);

        $user = User::find(auth()->user()->id);
        $user->password = Hash::make($request->password);
        $user->save();

        return to_route('shop.change-credential.index')->with('success', 'Password has been changed successfully');
    }

    public function changeEmail(Request $request)
    {
        $this->validate($request,  [
            'email' => 'required|email|unique:users,email,' . auth()->user()->id
        ]);

        $user = User::find(auth()->user()->id);
        $user->email = $request->email;
        $user->save();

        return to_route('shop.change-credential.index')->with('success', 'Email has been changed successfully');
    }

    public function update(UpdateProfileRequest $request, $shopId)
    {
        $shop = Shop::find($shopId);
        $shop->update($request->validated());

        return to_route('shop.profile.index')->with('success', 'Shop updated successfully');
    }

    public function updateShopProfile(Request $request)
    {
        // dd($request->id);

        $shop = Shop::find($request->id);
        $shop->name = $request->name;
        $shop->short_description = $request->short_description;
        $shop->description = $request->description;
        $shop->site_url = $request->site_url;
        $shop->type = $request->type;

        if ($request->hasFile('image')) {
            $logoName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->move(public_path('uploads/shops'), $logoName);
            $shop->image = 'uploads/shops/' . $logoName;
        }

        $shop->save();

        return to_route('shop.coupons.index')->with('success', 'Shop updated successfully');
    }
}
