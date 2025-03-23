<?php

namespace App\Http\Controllers\Admin\User;

use App\Helpers\PageHeader;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserStoreRequest;
use App\Http\Requests\Admin\User\UserUpdateRequest;
use App\Mail\ContactMail;
use App\Models\Contact;
use App\Models\favoritShop;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $overviews = [
            [
                'title' => 'Total Users',
                'icon' => 'heroicons:user-group',
                'iconBgColor' => 'bg-primary-500 bg-opacity-20 text-primary-500',
                'textColor' => 'text-slate-500',
                'value' => User::whereRelation('roles', 'name', '!=', 'user')->count(),
            ],
            [
                'title' => 'Total Active Users',
                'icon' => 'heroicons:check',
                'iconBgColor' => 'bg-success-500 bg-opacity-20 text-success-500',
                'textColor' => 'text-slate-500',
                'value' => User::whereRelation('roles', 'name', '!=', 'user')->active()->count(),
            ],
            [
                'title' => 'Total InActive Users',
                'icon' => 'heroicons:exclamation-circle',
                'iconBgColor' => 'bg-danger-500 bg-opacity-20 text-danger-500',
                'textColor' => 'text-slate-500',
                'value' => User::whereRelation('roles', 'name', '!=', 'user')->inactive()->count(),
            ],
        ];

        $buttons = [
            [
                'title' => 'Add User',
                'url' => route('admin.users.create'),
                'icon' => 'heroicons:plus',
            ],
        ];

        PageHeader::set()->title('Coupons')->buttons($buttons);

        $users = User::with(['roles'])->whereRelation('roles', 'name', '!=', 'user')->latest()->paginate();

        return Inertia::render('Admin/User/Index', compact('users', 'overviews'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        PageHeader::set()->title('New User')->buttons([
            [
                'title' => 'Back',
                'url' => route('admin.users.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ]);

        return Inertia::render('Admin/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->validated());
            // role as admin
            $user->assignRole($request->role);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()->with('error', $th->getMessage());
        }

        return to_route('admin.users.index')->with('success', 'User created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        PageHeader::set()->title('Edit User')->buttons([
            [
                'title' => 'Back',
                'url' => route('admin.users.index'),
                'icon' => 'heroicons:arrow-left',
            ],
        ]);

        return Inertia::render('Admin/User/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());
        // assign role
        if ($request->role) {
            $user->assignRole($request->role);
        }

        return to_route('admin.users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }

    public function storeContactMessage(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validatedData);

        $toMail = 'raqamisuq@gmail.com';
        $name = $request->name;
        $phone = $request->phone;
        $subject = $request->subject;
        $messageContent = $request->message;

        Mail::to($toMail)->send(new ContactMail($name, $phone, $subject, $messageContent));

        return redirect()->back()->with('success', 'Your message was submitted successfully.');
    }

    public function addToFavorite(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'shop' => 'required|exists:shops,id' // Ensure the shop exists in the shops table
        ]);

        // Get the currently authenticated user
        $user = auth()->user();

        // Check if the shop is already in the user's favorite list
        $inFavorite = favoritShop::where('shop_id', $validatedData['shop'])
            ->where('user_id', $user->id)
            ->first();

        // If the shop is already in the user's favorite list, return with a success message
        if ($inFavorite) {
            return back()->with('success', 'Shop already in your favourite');
        }

        // Add the shop to the user's favorite list
        favoritShop::create([
            'shop_id' => $validatedData['shop'],
            'user_id' => $user->id
        ]);

        // Return with a success message
        return back()->with('success', 'Shop added to favourite successfully');
    }

    public function filterUser(Request $request)
    {
        PageHeader::set()->title('Users');

        $search = $request->input('search');

        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10);

        return Inertia::render('Admin/User/FilterResultPage', [
            'users' => $users,
            'search' => $search
        ]);
    }
}
