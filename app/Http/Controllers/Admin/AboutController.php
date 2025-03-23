<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\PageHeader;
use App\Models\AboutSection;
use Inertia\Inertia;

class AboutController extends Controller
{
    //show about page
    public function show()
    {
        PageHeader::set()->title('About Section');
        $about = AboutSection::first();
        return Inertia::render('Admin/About/Index', compact('about'));
    }

    //update about page
    public function update(Request $request)
    {
        $about = AboutSection::first();
        $about->update($request->all());
        // return redirect()->route('admin.about-content')->with('success', 'About Section updated successfully');
        return redirect()->route('admin.change-credential.index')->with('success', 'About Section updated successfully');
    }
}
