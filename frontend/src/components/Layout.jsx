import ApplicationLogo from './ApplicationLogo.jsx';
import Dropdown from './Dropdown.jsx';
import { useEffect, useState } from 'react';
import ResponsiveNavLink from './ResponsiveNavLink.jsx';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline/index.js';
import { useCart } from '../hooks/useCart.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { themeChange } from 'theme-change';

function Layout() {
    const location = useLocation();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { user, logout, isLoading } = useAuth();
    const { cartCount } = useCart();
    const { favCount } = useFavorites();

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link to="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex dark:text-gray-100 items-center">
                                <Link
                                    to="/products"
                                    className={`border-b-2 mt-4 pb-4 ${location.pathname === '/products' ? 'border-yellow-500' : 'border-transparent'} transition duration-300 hover:border-yellow-500`}
                                >
                                    Products
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6 space-x-2">
                            <Link
                                data-test="shopping-cart"
                                to="/favorites"
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                                {user && favCount > 0 && (
                                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-2 -right-2">
                                        {favCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                data-test="shopping-cart"
                                to="/cart"
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                {user && cartCount > 0 && (
                                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-2 -right-2">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {isLoading ? (
                                <span className="loading loading-bars loading-lg"></span>
                            ) : (
                                <div className="ms-3 relative">
                                    {user ? (
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user.name}

                                                        <svg
                                                            className="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                {user.is_admin ? <Dropdown.Link to="/admin">Admin</Dropdown.Link> : ''}
                                                <Dropdown.Link to="/profile/edit">Profile</Dropdown.Link>
                                                <Dropdown.Link to="/orders">Orders</Dropdown.Link>
                                                <Dropdown.Button onClick={handleLogout} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Button>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    ) : (
                                        <div className="space-x-2">
                                            <button
                                                className="btn btn-outline btn-accent btn-sm"
                                                onClick={() => (window.location.href = '/login')}
                                            >
                                                Login
                                            </button>
                                            <button
                                                className="btn btn-outline btn-error btn-sm"
                                                onClick={() => (window.location.href = '/register')}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink to="/products">Products</ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user?.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                        </div>

                        <div className="flex justify-center">
                            <Link
                                data-test="shopping-cart"
                                to="/cart"
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                {user && cartCount > 0 && (
                                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-2 -right-2">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {user ? (
                            <div className="mt-3 space-y-1">
                                {user.is_admin ? <ResponsiveNavLink to="/admin">Admin</ResponsiveNavLink> : ''}
                                <ResponsiveNavLink to="/profile/edit">Profile</ResponsiveNavLink>
                                <ResponsiveNavLink to="#" onClick={handleLogout} method="post" as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div className="mt-2 space-y-2">
                                <button
                                    className="btn btn-outline btn-accent w-full"
                                    onClick={() => (window.location.href = '/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-outline btn-error w-full"
                                    onClick={() => (window.location.href = '/register')}
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="py-12">
                <div className="max-w-[1920px] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
