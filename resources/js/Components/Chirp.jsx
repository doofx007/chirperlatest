import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import TextareaAutosize from 'react-textarea-autosize'; // Auto-expand input
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useForm, usePage } from '@inertiajs/react';

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: chirp.message,
    });

    const { data: commentData, setData: setCommentData, post, put, destroy, processing, reset: resetComment, errors: commentErrors } = useForm({
        body: '',
    });

    const submitChirpEdit = (e) => {
        e.preventDefault();
        patch(route('chirps.update', chirp.id), { onSuccess: () => setEditing(false) });
    };

    const submitComment = (e) => {
        e.preventDefault();
        if (editingCommentId) {
            put(route('comments.update', editingCommentId), {
                onSuccess: () => {
                    resetComment();
                    setEditingCommentId(null);
                },
            });
        } else {
            post(route('comments.store', chirp.id), {
                onSuccess: () => resetComment(),
            });
        }
    };

    const deleteComment = (id) => {
        destroy(route('comments.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="p-6 space-y-6 border border-gray-200 rounded-md shadow-sm bg-gray-50">
            <div className="flex space-x-3">
                <div className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <span className="font-bold text-gray-800">{chirp.user.name}</span>
                            <small className="ml-2 text-sm text-gray-500">{dayjs(chirp.created_at).fromNow()}</small>
                            {chirp.created_at !== chirp.updated_at && (
                                <small className="text-sm text-gray-500"> · edited</small>
                            )}
                        </div>
                        {chirp.user.id === auth.user.id && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="p-1 text-gray-400 rounded hover:bg-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <button
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit
                                    </button>
                                    <Dropdown.Link
                                        as="button"
                                        href={route('chirps.destroy', chirp.id)}
                                        method="delete"
                                    >
                                        Delete
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>
                    {editing ? (
                        <form onSubmit={submitChirpEdit} className="mt-3">
                            <TextareaAutosize
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full p-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            <InputError message={errors.message} className="mt-1" />
                            <div className="flex mt-2 space-x-2">
                                <button type="submit" className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">Save</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        reset();
                                        clearErrors();
                                    }}
                                    className="px-4 py-1 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-3 text-gray-800">{chirp.message}</p>
                    )}
                </div>
            </div>
            <button
                onClick={() => setShowComments(!showComments)}
                className="text-sm text-blue-500 hover:underline"
            >
                {showComments ? 'Hide Comments' : `Show Comments (${chirp.comments.length})`}
            </button>
            {showComments && (
                <div className="mt-4 space-y-3">
                    {chirp.comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-white border rounded-md">
                            <div className="flex justify-between">
                                <div>
                                    <span className="text-sm font-bold text-gray-800">{comment.user.name}</span>
                                    <small className="ml-2 text-xs text-gray-500">{dayjs(comment.created_at).fromNow()}</small>
                                </div>
                                {comment.user.id === auth.user.id && (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="p-1 text-gray-400 rounded hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <button
                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                                onClick={() => {
                                                    setCommentData('body', comment.body);
                                                    setEditingCommentId(comment.id);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <Dropdown.Link
                                                as="button"
                                                href={route('comments.destroy', comment.id)}
                                                method="delete"
                                            >
                                                Delete
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}
                            </div>
                            <p className="mt-1 text-gray-700">{comment.body}</p>
                        </div>
                    ))}
                    <form onSubmit={submitComment} className="flex items-center mt-3 space-x-2">
                        <TextareaAutosize
                            value={commentData.body}
                            onChange={(e) => setCommentData('body', e.target.value)}
                            className="flex-1 p-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            className="p-2 text-white bg-white rounded-full hover:bg-gray-200"
                            disabled={processing}
                        >
                            <img src="/Images/send.png" alt="Send" className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
