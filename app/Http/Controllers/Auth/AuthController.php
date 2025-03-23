<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\DashboardRedirectPath;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;
use App\Models\Country;
use App\Models\LoginHistory;

class AuthController extends Controller
{
    //
    public function loginUser(Request $request)
    {
        // Validate the request data
        $request->validate([
            'phone' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('phone', '+964' . $request->phone)->first();
        if ($user) {
            Auth::login($user);
            $loginHistory = new LoginHistory();
            $loginHistory->user_id = $user->id;
            $loginHistory->save();
            return redirect()->intended(DashboardRedirectPath::get($request));
        }

        // if ($user) {
        //     if ($user->user_type == 'admin') {
        //         // Attempt to authenticate the user
        //         Auth::login($user);
        //         return redirect()->intended(DashboardRedirectPath::get($request));
        //     } else {
        //         $generateOtp = mt_rand(1000, 9999);
        //         $user->otp = $generateOtp;
        //         $user->save();

        //         session()->put('user_phone', $request->phone);
        //         session()->put('user_password', $request->password);

        //         //send otp sms code here
        //         $response = Http::withHeaders([
        //             'Authorization' => 'Bearer 195|yMWiuXcXm02bBjVo1DcInAL0GsErPwUX63mfdDyc4e2372db',
        //             'Content-Type' => 'application/json',
        //             'Accept' => 'application/json',
        //         ])->post('https://gateway.standingtech.com/api/v4/sms/send', [
        //             'recipient' => $request->phone,
        //             'sender_id' => 'Balash',  // Replace with your sender ID
        //             'type' => 'whatsapp',       // If using SMS, change this to 'sms'
        //             'message' => 'Your OTP code is: ' . $generateOtp,
        //             'lang' => 'en',             // Use 'en' for English or 'ar' for Arabic
        //         ]);

        //         // Redirect the user to the otp route
        //         return redirect('otp')->with('success', 'Please check your whatsapp');
        //     }
        // }

        // If authentication fails, return the login form with an error message
        return back()->withErrors([
            'phone' => 'Wrong phone no',
            'password' => 'Wrong password'
        ]);
    }


    public function forgetPassword(Request $request)
    {
        return inertia('Auth/ForgotPassword');
    }

    public function forgetPasswordPhoneCheck(Request $request)
    {
        // dd($request->all());
        // Validate the request data
        $request->validate([
            'phone' => 'required',
        ]);

        // Check if the provided phone number exists in the database
        $user = User::where('phone', '+964' . $request->phone)->first();


        if ($user) {
            $generateOtp = mt_rand(1000, 9999);
            $user->otp = $generateOtp;
            $user->save();
            //send otp sms code here
            $response = Http::withHeaders([
                'Authorization' => 'Bearer 195|yMWiuXcXm02bBjVo1DcInAL0GsErPwUX63mfdDyc4e2372db',
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->post('https://gateway.standingtech.com/api/v4/sms/send', [
                'recipient' => '+964' . $request->phone,
                'sender_id' => 'Balash',  // Replace with your sender ID
                'type' => 'whatsapp',       // If using SMS, change this to 'sms'
                'message' => 'Your OTP code is: ' . $user->otp,
                'lang' => 'en',             // Use 'en' for English or 'ar' for Arabic
            ]);
            session()->put('forget_phone', '+964' . $request->phone);
            return redirect('forget-password-otp')->with('success', 'Please check your whatsapp');
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'phone' => 'Something went wrong, please try again later',
            ]);
        }

        // If authentication fails, return the login form with an error message
        return back()->withErrors([
            'phone' => 'Wrong phone no',
        ]);
    }

    public function forgetPasswordOTP(Request $request)
    {
        if (session()->has('forget_phone')) {
            return inertia('Auth/ForgetPasswordOTP');
        } else {
            return redirect('login');
        }
    }

    public function forgetPasswordOTPCheck(Request $request)
    {
        // Validate the request data
        $request->validate([
            'otp' => 'required',
        ]);

        $forget_phone = session()->get('forget_phone');

        // Check if the provided phone number exists in the database
        $user = User::where('phone', $forget_phone)
            ->where('otp', $request->otp)->first();

        if ($user) {
            session()->put('forget_otp', $user->otp);
            return redirect('reset-password');
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'otp' => 'Something went wrong, please try again later',
            ]);
        }

        // If authentication fails, return the login form with an error message
        return back()->withErrors([
            'otp' => 'Wrong otp',
        ]);
    }

    public function resetPassword(Request $request)
    {
        if (session()->has('forget_phone') && session()->get('forget_otp')) {
            return inertia('Auth/ResetPassword');
        } else {
            return redirect('login');
        }
    }

    public function resetPasswordUpdate(Request $request)
    {
        // Validate the request data
        $request->validate([
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        $forget_phone = session()->get('forget_phone');
        $forget_otp = session()->get('forget_otp');

        // Check if the provided phone number exists in the database
        $user = User::where('phone', $forget_phone)
            ->where('otp', $forget_otp)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();

            session()->forget('forget_phone');
            session()->forget('forget_otp');

            return redirect('login');
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'password' => 'Something went wrong, please try again later',
            ]);
        }
    }

    public function UserOtp()
    {
        if (session()->has('user_phone')) {
            return inertia('Auth/OTP');
        } else {
            return redirect('login');
        }
    }

    public function UserOtpCheck(Request $request)
    {
        // Validate the request data
        $request->validate([
            'otp' => 'required',
        ]);

        $user_phone = session()->get('user_phone');
        $user_password = session()->get('user_password');
        $is_registered = session()->get('is_registered');
        $user_type = session()->get('user_type');

        // Check if the provided phone number exists in the database
        $user = User::where('phone', $user_phone)->where('otp', $request->otp)->first();

        // dd($user);

        if ($user) {
            if ($is_registered == 'yes') {
                if ($user_type == 'shop') {
                    Auth::login($user);
                    session()->forget('user_phone');
                    session()->forget('user_password');
                    session()->forget('is_registered');
                    session()->forget('user_type');
                    return redirect('shop/profile');
                } else {
                    // Attempt to authenticate the user
                    Auth::login($user);
                    session()->forget('user_phone');
                    session()->forget('user_password');
                    session()->forget('is_registered');
                    session()->forget('user_type');
                    return redirect()->intended(DashboardRedirectPath::get($request));
                }
            } else {
                // Attempt to authenticate the user
                Auth::login($user);
                session()->forget('user_phone');
                session()->forget('user_password');
                return redirect()->intended(DashboardRedirectPath::get($request));
            }
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'otp' => 'Something went wrong, please try again later',
            ]);
        }

        // If authentication fails, return the login form with an error message
        return back()->withErrors([
            'otp' => 'Wrong otp',
        ]);
    }

    public function resendForgetOtp()
    {
        $forget_phone = session()->get('forget_phone');

        // Check if the provided phone number exists in the database
        $user = User::where('phone', $forget_phone)->first();
        if ($user) {
            //send otp sms code here
            $response = Http::withHeaders([
                'Authorization' => 'Bearer 195|yMWiuXcXm02bBjVo1DcInAL0GsErPwUX63mfdDyc4e2372db',
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->post('https://gateway.standingtech.com/api/v4/sms/send', [
                'recipient' => $user->phone,
                'sender_id' => 'Balash',  // Replace with your sender ID
                'type' => 'whatsapp',       // If using SMS, change this to 'sms'
                'message' => 'Your OTP code is: ' . $user->otp,
                'lang' => 'en',             // Use 'en' for English or 'ar' for Arabic
            ]);
            return redirect()->back()->with('success', 'Please check your whatsapp');
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'otp' => 'Something went wrong, please try again later',
            ]);
        }
    }

    public function resendOtp()
    {
        $user_phone = session()->get('user_phone');

        // Check if the provided phone number exists in the database
        $user = User::where('phone', $user_phone)->first();
        if ($user) {
            //send otp sms code here
            $response = Http::withHeaders([
                'Authorization' => 'Bearer 195|yMWiuXcXm02bBjVo1DcInAL0GsErPwUX63mfdDyc4e2372db',
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->post('https://gateway.standingtech.com/api/v4/sms/send', [
                'recipient' => $user->phone,
                'sender_id' => 'Balash',  // Replace with your sender ID
                'type' => 'whatsapp',       // If using SMS, change this to 'sms'
                'message' => 'Your OTP code is: ' . $user->otp,
                'lang' => 'en',             // Use 'en' for English or 'ar' for Arabic
            ]);
            return redirect()->back()->with('success', 'Please check your whatsapp');
        } else {
            // If authentication fails, return the login form with an error message
            return back()->withErrors([
                'otp' => 'Something went wrong, please try again later',
            ]);
        }
    }
}
