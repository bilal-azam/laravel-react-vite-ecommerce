import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks/useAuth.js';
import PageNotFound from '../components/PageNotFound.jsx';

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mx-auto h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    if (!user?.is_admin) {
        return <PageNotFound />;
    }

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`bg-base-200 w-[250px] lg:block ${isSidebarOpen ? '' : 'hidden'}`}>
                <div className="p-4">
                    <Link to="/products" className="flex justify-center items-center text-xl font-bold space-x-2">
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        <span>Home</span>
                    </Link>
                </div>
                <div className="pt-20">
                    <ul className="menu">
                        <li>
                            <Link className="pb-4 pt-4" to="/admin/users">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link className="pb-4 pt-4" to="/admin/products">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link className="pb-4 pt-4" to="/admin/categories">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link className="pb-4 pt-4" to="/admin/brands">
                                Brands
                            </Link>
                        </li>
                        <li>
                            <Link className="pb-4 pt-4" to="/admin/orders">
                                Orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col w-full overflow-hidden">
                {/* Navbar with Toggle Button */}
                <nav className="bg-gray-800 text-white p-4 lg:p-8 sticky top-0 z-10">
                    <button onClick={toggleSidebar} className="lg:hidden">
                        {isSidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Content */}
                <main className="flex-grow p-4 overflow-auto transition-transform">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
