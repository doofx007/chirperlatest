<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;

class CommentController extends Controller
{
    /**
     * Store a new comment for a chirp.
     */
    public function store(Request $request, Chirp $chirp): RedirectResponse
    {
        $validated = $request->validate([
            'body' => 'required|string|max:255',
        ]);

        // Create the comment
        $chirp->comments()->create([
            'user_id' => Auth::id(),
            'body' => $validated['body'],
        ]);

        return redirect()->back();
    }

    /**
     * Update an existing comment.
     */
    public function update(Request $request, Comment $comment): RedirectResponse
    {
        // Authorize the action
        Gate::authorize('update', $comment);

        $validated = $request->validate([
            'body' => 'required|string|max:255',
        ]);

        // Update the comment
        $comment->update($validated);

        return redirect()->back();
    }

    /**
     * Delete a comment.
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        // Authorize the deletion action
        Gate::authorize('delete', $comment);

        // Delete the comment
        $comment->delete();

        // Redirect back to the same page
        return redirect()->back();
    }
}
