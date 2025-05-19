'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, User, Star, LogOut } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                console.log('Parsed user data:', parsedUser);
                // Simply set the parsed user data since it's already in the correct format
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            // router.push('/login');
        }
    }, []);


    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login');
    //     }
    // }, [user, router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    const navItems = [
        { href: "/browse-extensions", label: "Extensions", icon: Package },
        { href: "/user/profile", label: "Profile", icon: User },
        { href: "/user/favorites", label: "Favorites", icon: Star },
    ];

    const isActive = (path) => pathname === path;

    if (!user) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            SyntexSnap
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;