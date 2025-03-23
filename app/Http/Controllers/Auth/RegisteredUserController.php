<?php

namespace App\Http\Controllers\Auth;

use App\Models\Shop;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Http;
use Stevebauman\Location\Facades\Location;
use App\Models\Country;
use App\Helpers\DashboardRedirectPath;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                // 'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'phone' => 'required|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            if (isset($e->validator->failed()['phone']['Unique'])) {
                return redirect()->back()->with('error', 'This phone number is already registered.');
            }
            throw $e;
        }

        $user = User::create([
            'name' => $request->name,
            // 'email' => $request->email,
            'phone' => '+964' . $request->phone,
            'password' => Hash::make($request->password),
            'otp_verified' => 'not',
            'user_type' => 'user', // Always set to user
        ]);

        $user->assignRole('user');

        // session()->put('user_phone', '+964' . $request->phone);
        // session()->put('user_password', $request->password);
        // session()->put('is_registered', 'yes');
        // session()->put('user_type', $request->user_type);

        //send otp sms code here.
        // $generateOtp = mt_rand(1000, 9999);
        // $user->otp = $generateOtp;
        // $user->save();
        // $response = Http::withHeaders([
        //     'Authorization' => 'Bearer 195|yMWiuXcXm02bBjVo1DcInAL0GsErPwUX63mfdDyc4e2372db',
        //     'Content-Type' => 'application/json',
        //     'Accept' => 'application/json',
        // ])->post('https://gateway.standingtech.com/api/v4/sms/send', [
        //     'recipient' => '+964' . $request->phone,
        //     'sender_id' => 'Balash',  // Replace with your sender ID
        //     'type' => 'whatsapp',       // If using SMS, change this to 'sms'
        //     'message' => 'Your OTP code is: ' . $generateOtp,
        //     'lang' => 'en',             // Use 'en' for English or 'ar' for Arabic
        // ]);

        // if ($request->user_type == 'shop') {
        //     $user->assignRole('shop');

        //     $newShop = new Shop();
        //     $newShop->name = $user->name;
        //     $newShop->slug = Str::slug($user->name);
        //     $newShop->save();

        //     $newShop->users()->attach($user->id);
        //     $shop = $newShop;
        // } else {
        //     $user->assignRole('user');
        // }

        event(new Registered($user));
        Auth::login($user);
        return redirect()->intended(DashboardRedirectPath::get($request));
        // return redirect('otp')->with('success', 'Please check your whatsapp');
    }
}
