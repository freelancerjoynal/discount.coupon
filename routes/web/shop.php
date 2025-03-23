<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Dashboard\VerifyShop;
use App\Http\Controllers\Shop\ProfileController;
use App\Http\Controllers\Shop\DashboardController;
use App\Http\Controllers\Shop\Coupon\CouponController;
use App\Http\Controllers\Shop\Coupon\CouponUserController;
use App\Http\Controllers\Shop\Coupon\CouponClaimController;

Route::group(['middleware' => ['auth', VerifyShop::class], 'prefix' => 'shop', 'as' => 'shop.'], function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('coupons', CouponController::class);
    Route::resource('coupon-claims', CouponClaimController::class)->only(['index', 'create', 'store']);

    Route::get('coupons/{coupon}/users', [CouponUserController::class, 'couponUsers'])->name('coupon-users');
    Route::get('coupons/{coupon}/users/{couponUser}/claims', [CouponUserController::class, 'userClaims'])->name('coupon-user-claims');

    Route::resource('profile', ProfileController::class)->only(['index', 'update']);
    Route::post('profile-update', [ProfileController::class, 'updateShopProfile'])->name('profile-update');
    Route::get('change-credential', [ProfileController::class, 'changeCredentialView'])->name('change-credential.index');
    Route::post('change-password', [ProfileController::class, 'changePassword'])->name('change-password.store');
    Route::post('change-email', [ProfileController::class, 'changeEmail'])->name('change-email.store');

    Route::get('/coupon-claim-user', [CouponClaimController::class, 'showUser'])->name('coupon.claim.user.get');

    Route::post('/coupon-claim-shopper/{id}', [CouponClaimController::class, 'couponClaimFromShopper'])->name('coupon.claim.shopper');

    Route::post('/shop-change-credit', [CouponClaimController::class, 'shopChangeCredit'])->name('shop.change.credit');
    Route::get('search/coupon', [CouponController::class, 'filterCoupon'])->name('filter.coupon');
});
