<?php

namespace App\Http\Controllers\Auth;

use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class GoogleController extends Controller
{
    public function redirectToGoogle (Request $request) {

        return Socialite::driver('google')->redirect();

    }

    public function handleGoogleCallback (Request $request) {

        $user = Socialite::driver('google')->user();

        $findUser = User::where('google_id', $user->id)->first();

        if (!is_null($findUser)) {
            Auth::login($findUser);
        } else {
            $findUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'google_id' => $user->id,
                'password' => bcrypt('password'), // Default password for new users
            ]);

            Auth::login($findUser);

        }
        return redirect()->to('/dashboard');
    }
}
