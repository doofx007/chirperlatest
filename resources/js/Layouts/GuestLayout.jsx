import ApplicationLogoWhite from '@/Components/ApplicationLogoWhite';
import ApplicationLogoBlack from '@/Components/ApplicationLogoBlack';
import { Link } from '@inertiajs/react';

export default function GuestLayout({
    children,
    logoOnRight = false,
    logoBackground = 'bg-black',
    formBackground = 'bg-gray-100',
    useBlackLogo = false,
}) {
    return (
        <div className="flex min-h-screen">
            {/* Left Section */}
            {!logoOnRight && (
                <div
                    className={`hidden w-1/2 ${logoBackground} sm:flex sm:items-center sm:justify-center`}
                >
                    {useBlackLogo ? (
                        <ApplicationLogoBlack className="w-80 h-80" />
                    ) : (
                        <ApplicationLogoWhite className="w-80 h-80" />
                    )}
                </div>
            )}

            {/* Right Section */}
            <div
                className={`flex items-center justify-center ${
                    logoOnRight ? 'w-1/2' : 'w-full'
                } ${formBackground} sm:w-1/2`}
            >
                <div className="w-full max-w-md px-8 py-8 bg-white shadow-md sm:rounded-lg">
                    {children}
                </div>
            </div>

            {/* Right Section Logo */}
            {logoOnRight && (
                <div
                    className={`hidden w-1/2 ${logoBackground} sm:flex sm:items-center sm:justify-center`}
                >
                    {useBlackLogo ? (
                        <ApplicationLogoBlack className="w-80 h-80" />
                    ) : (
                        <ApplicationLogoWhite className="w-80 h-80" />
                    )}
                </div>
            )}
        </div>
    );
}
