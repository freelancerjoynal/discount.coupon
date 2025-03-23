<?php

use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Auth as Auth;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/locale/{locale}', function ($locale) {
//     App::setLocale($locale);
//     session(['locale' => $locale]);

//     return redirect()->back();
// });

Route::middleware('guest')->group(function () {
    Route::get('register', [Auth\RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [Auth\RegisteredUserController::class, 'store']);

    Route::get('login', [Auth\AuthenticatedSessionController::class, 'create'])
        ->name('login');
    // Route::post('login', [Auth\AuthenticatedSessionController::class, 'store']);
    Route::post('login-submit', [AuthController::class, 'loginUser'])->name('loginSubmit');

    Route::get('/forget-password', [AuthController::class, 'forgetPassword'])->name('forgetPassword');
    Route::post('/forget-password', [AuthController::class, 'forgetPasswordPhoneCheck'])->name('forgetPasswordPhoneCheck');
    Route::get('/forget-password-otp', [AuthController::class, 'forgetPasswordOTP'])->name('forgetPasswordOtp');
    Route::get('/resend-forget-otp', [AuthController::class, 'resendForgetOtp'])->name('resendForgetOtp');
    Route::post('/forget-password-otp', [AuthController::class, 'forgetPasswordOTPCheck'])->name('forgetPasswordOtpCheck');
    Route::get('/reset-password', [AuthController::class, 'resetPassword'])->name('resetPassword');
    Route::post('/reset-password', [AuthController::class, 'resetPasswordUpdate'])->name('resetPasswordUpdate');

    Route::get('/otp', [AuthController::class, 'UserOtp'])->name('UserOtp');
    Route::get('/resend-otp', [AuthController::class, 'resendOtp'])->name('resendOtp');
    Route::post('/otp-check', [AuthController::class, 'UserOtpCheck'])->name('UserOtpCheck');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [Auth\AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::post('submit-contact', [UserController::class, 'storeContactMessage'])
    ->name('submit.contact');
Route::post('add-to-favorite', [UserController::class, 'addToFavorite'])
    ->name('add.to.favorite');
