'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedUser);
    }, []);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        // { href: "/extensions", label: "Extensions" },
        // { href: "/req-publish", label: "Publish" },
        // Show profile link only when user is logged in
        ...(user ? [{ href: "/profile", label: "Profile" }] : []),
        // Conditional login/logout link
        user
            ? { href: "/", label: "Logout", onClick: handleLogout }
            : { href: "/login", label: "Login" },
        // { href: "/admin-login", label: "Admin Login" }
    ];

    const isActive = (path) => pathname === path;

    return (
        <div className="top-0 z-50 sticky border-gray-200 bg-white/80 backdrop-blur-sm border-b">
            <div className='mx-auto container'>
                <nav className="flex md:flex-row flex-col justify-between items-center px-6 py-4">
                    <div className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-3xl text-transparent">
                        VSCode Marketplace
                    </div>
                    <div className='space-x-2 md:space-x-6 mt-4 md:mt-0'>
                        {navLinks.map((link) => (
                            link.onClick ? (
                                <button
                                    key={link.label}
                                    onClick={link.onClick}
                                    className="hover:bg-gray-100 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-all duration-200"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md transition-all duration-200 ${isActive(link.href)
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;