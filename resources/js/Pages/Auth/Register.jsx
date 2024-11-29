import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        // Redirect to the Google authentication route
        window.location.href = route('redirect.google');
    };

    return (
        <GuestLayout
            logoOnRight={true}
            logoBackground="bg-white"
            formBackground="bg-black"
            useBlackLogo={true}
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-6 text-white">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                        className="text-gray-400"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1 text-black border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-gray-400"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1 text-black border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="text-gray-400"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1 text-black border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-gray-400"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1 text-black border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-400 underline hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>
                </div>

                <div>
                    <PrimaryButton
                        className="justify-center w-full rounded-lg"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
                <div className="w-full h-px bg-gray-300"></div>
                <span className="mx-4 text-gray-400">OR</span>
                <div className="w-full h-px bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <div>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full px-4 py-2 text-xs font-semibold text-gray-900 uppercase bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 mr-2"
                    >
                        <path
                            fill="#4285F4"
                            d="M23.49 12.275c0-.822-.066-1.606-.189-2.357H12v4.472h6.455c-.28 1.518-1.104 2.806-2.344 3.664v3.046h3.786c2.215-2.04 3.493-5.05 3.493-8.825z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.96-1.08 7.946-2.946l-3.787-3.047c-1.055.708-2.4 1.13-4.159 1.13-3.202 0-5.913-2.165-6.885-5.07H1.18v3.17C3.172 21.27 7.24 24 12 24z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.115 14.067A7.08 7.08 0 0 1 4.62 12c0-.715.123-1.408.347-2.067V6.764H1.18A11.96 11.96 0 0 0 0 12c0 1.938.457 3.772 1.18 5.236l3.935-3.169z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 4.713c1.764 0 3.345.607 4.587 1.795l3.443-3.443C17.953 1.64 15.233 0 12 0 7.239 0 3.172 2.73 1.18 6.764l3.935 3.169c.972-2.905 3.683-5.07 6.885-5.07z"
                        />
                    </svg>
                    SIGN UP WITH GOOGLE
                </button>
            </div>
        </GuestLayout>
    );
}
