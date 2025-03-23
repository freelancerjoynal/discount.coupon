<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin as Admin;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\Contact\ContactController;
use App\Http\Middleware\Dashboard\VerifyAdmin;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\Coupon\CouponClaimController;
use App\Http\Controllers\Admin\Shop\ShopUserController;

Route::group(['middleware' => ['auth', VerifyAdmin::class], 'prefix' => 'admin', 'as' => 'admin.'], function () {

    Route::get('/dashboard', Admin\DashboardController::class)->name('dashboard');
    Route::resource('coupons', Admin\Coupon\CouponController::class);
    Route::resource('users', Admin\User\UserController::class);
    Route::resource('shops', Admin\Shop\ShopController::class);
    Route::resource('shops.users', Admin\Shop\ShopUserController::class)->only(['index', 'store', 'destroy']);
    Route::resource('social', Admin\SocialIconController::class)->except('show');
    Route::resource('coupon-claims', CouponClaimController::class)->only(['index', 'create', 'store']);
    // Route::post('shops/{shop}/add-user', [Admin\Shop\ShopUserController::class, 'shopUsers'])->name('add.shop-users');
    // Route::get('shops/{shop}/users', [Admin\Shop\ShopUserController::class, 'index'])->name('remove.shop-user');
    // Route::get('shops/{shop}/remove-user/{user}', [Admin\Shop\ShopUserController::class, 'removeUser'])->name('remove.shop-user');

    Route::get('coupons/{coupon}/users', [Admin\Coupon\CouponUserController::class, 'couponUsers'])->name('coupon-users');
    Route::get('coupons/{coupon}/users/{couponUser}/claims', [Admin\Coupon\CouponUserController::class, 'userClaims'])->name('coupon-user-claims');

    Route::get('change-credential', [ProfileController::class, 'changeCredentialView'])->name('change-credential.index');
    Route::post('change-password', [ProfileController::class, 'changePassword'])->name('change-password.store');
    Route::post('change-email', [ProfileController::class, 'changeEmail'])->name('change-email.store');
    Route::post('change-phone', [ProfileController::class, 'changePhone'])->name('change-phone.store');
    Route::get('shop-category', [ShopUserController::class, 'shopCategory'])->name('category.index');
    Route::get('crete-shop-category', [ShopUserController::class, 'createShopCategory'])->name('category.create');
    Route::get('edit-shop-category/{id}', [ShopUserController::class, 'editShopCategory'])->name('category.edit');
    Route::post('store-shop-category', [ShopUserController::class, 'storeShopCategory'])->name('category.store');
    Route::post('update-shop-category', [ShopUserController::class, 'updateShopCategory'])->name('category.update');
    Route::delete('delete-shop-category/{id}', [ShopUserController::class, 'deleteShopCategory'])->name('category.destroy');


    Route::get('search/coupon', [Admin\Coupon\CouponController::class, 'filterCoupon'])->name('filter.coupon');
    Route::get('search/shop', [Admin\Shop\ShopController::class, 'filterShop'])->name('filter.shop');
    Route::get('search/user', [Admin\User\UserController::class, 'filterUser'])->name('filter.user');
    Route::get('search/customer', [Admin\CustomerController::class, 'filterCustomer'])->name('filter.customer');

    Route::get('about-content', [AboutController::class, 'show'])->name('about-content');
    Route::post('update-content', [AboutController::class, 'update'])->name('about-content.update');

    Route::get('note', [Admin\NoteController::class, 'index'])->name('note');
    Route::post('note/update', [Admin\NoteController::class, 'update'])->name('note.update');

    Route::get('customers', [Admin\CustomerController::class, 'index'])->name('customers');
    Route::post('customers', [Admin\CustomerController::class, 'store'])->name('customers.store');
    Route::put('customers/{customer}', [Admin\CustomerController::class, 'update'])->name('customers.update');
    Route::delete('customers/{customer}', [Admin\CustomerController::class, 'destroy'])->name('customers.destroy');

    Route::get('contact', [ContactController::class, 'viewContacts'])->name('contacts.view');
    Route::get('contact/add', [ContactController::class, 'createContact'])->name('contacts.create');
    Route::get('contact/{id}/edit', [ContactController::class, 'editContact'])->name('contacts.edit');
    Route::post('contact', [ContactController::class, 'storeContact'])->name('contacts.store');
    Route::post('contact/{id}', [ContactController::class, 'updateContact'])->name('contacts.update');
    Route::delete('contact/{id}', [ContactController::class, 'deleteContact'])->name('contacts.destroy');
});
