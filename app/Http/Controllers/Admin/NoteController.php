<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Helpers\PageHeader;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        PageHeader::set()->title('Notes');
        
        $note = Note::first();
        return Inertia::render('Admin/Note/Index', [
            'note' => $note
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        $note = Note::first();
        if (!$note) {
            $note = new Note();
        }
        
        $note->content = $request->content;
        $note->save();

        return redirect()->back()
            ->with('message', 'Note updated successfully.');
    }
}
