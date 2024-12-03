import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Chirp from '@/Components/Chirp';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        sendEmail: false, // Initialize sendEmail state
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />

            <div className="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <div className="flex items-center justify-between mt-4">
                        <PrimaryButton disabled={processing}>Chirp</PrimaryButton>
                        <label htmlFor="sendEmail" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    id="sendEmail"
                                    type="checkbox"
                                    checked={data.sendEmail}
                                    onChange={e => setData('sendEmail', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-10 h-5 transition-colors bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500"></div>
                                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform"></div>
                            </div>
                            <span className="ml-3 text-sm text-gray-600">Send email notification</span>
                        </label>
                    </div>
                </form>

                <div className="mt-6 bg-white divide-y rounded-lg shadow-sm">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
