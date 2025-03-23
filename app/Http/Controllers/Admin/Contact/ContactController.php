<?php

namespace App\Http\Controllers\Admin\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\PageHeader;
use App\Models\Contact;
use App\Models\ContactUs;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function viewContacts()
    {
        PageHeader::set()->title('Contacts');

        // $contacts = Contact::latest()->paginate();

        // $buttons = [
        //     [
        //         'title' => 'Add Item',
        //         'url' => route('admin.contact.add'),
        //         'icon' => 'heroicons:plus',
        //     ],
        // ];

        PageHeader::set()->title('Contact');

        $contact = ContactUs::latest()->paginate();

        return Inertia::render('Admin/Contact/Index', compact('contact'));
    }

    public function createContact()
    {
        // PageHeader::set()->title('Add Contact Item')->buttons(
        //     [
        //         [
        //             'title' => 'Back',
        //             'url' => route('admin.contacts.view'),
        //             'icon' => 'heroicons:chevron-left',
        //         ],
        //     ]
        // );

        PageHeader::set()->title('Add Contact Item');

        return Inertia::render('Admin/Contact/Create');
    }

    public function storeContact(Request $request)
    {
        $request->validate([
            'label' => ['required'],
            'content' => ['required'],
        ]);

        $social = new ContactUs();
        $social->label = $request->label;
        $social->content = $request->content;
        $social->save();

        return to_route('admin.contacts.view')->with('success', 'Contact item created successfully');
    }

    public function editContact(Request $request, $id)
    {
        // PageHeader::set()->title('Edit Contact Item')->buttons(
        //     [
        //         [
        //             'title' => 'Back',
        //             'url' => route('admin.contacts.view'),
        //             'icon' => 'heroicons:chevron-left',
        //         ],
        //     ]
        // );

        PageHeader::set()->title('Edit Contact Item');

        $contact = ContactUs::find($id);

        return Inertia::render('Admin/Contact/Edit', compact('contact'));
    }

    public function updateContact(Request $request)
    {
        $request->validate([
            'label' => ['required'],
            'content' => ['required'],
        ]);

        $contact = ContactUs::find($request->id);
        $contact->label = $request->label;
        $contact->content = $request->content;
        $contact->save();
        return to_route('admin.contacts.view')->with('success', 'Contact Item updated successfully');
    }

    public function deleteContact($id)
    {
        $contact = ContactUs::find($id);
        $contact->delete();

        return to_route('admin.contacts.view')->with('success', 'Contact item deleted successfully');
    }
}
