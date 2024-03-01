import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBoxOpen, faHeart as faHeartSolid, faHouse, faLayerGroup, faTag } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout.jsx';
import CartIndex from './Cart/Index.jsx';
import Index from './Index.jsx';
import ProductsIndex from './Products/Index.jsx';
import ProductsShow from './Products/Show.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';
import Favorites from './User/Favorites.jsx';
import UserOrdersIndex from './User/Orders/Index.jsx';
import UserOrdersShow from './User/Orders/Show.jsx';
import AdminProductsCreate from './Admin/Products/Create.jsx';
import AdminProductsIndex from './Admin/Products/Index.jsx';
import AdminVariantsCreate from './Admin/Products/Variants/Create.jsx';
import AdminVariantsEdit from './Admin/Products/Variants/Edit.jsx';
import AdminBrandsIndex from './Admin/Brands/Index.jsx';
import AdminCategoriesIndex from './Admin/Categories/Index.jsx';
import AdminOrdersIndex from './Admin/Orders/Index.jsx';
import AdminOrdersShow from './Admin/Orders/Show.jsx';
import AdminUsers from './Admin/Users.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from './components/PageNotFound.jsx';

library.add(faHeart, faHeartSolid, faHouse, faBoxOpen, faTag, faLayerGroup);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Index />,
            },
            {
                path: '/cart',
                element: <CartIndex />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
            },
            {
                path: '/orders',
                element: <UserOrdersIndex />,
            },
            {
                path: '/orders/:uuid',
                element: <UserOrdersShow />,
            },
            {
                path: '/products',
                element: <ProductsIndex />,
            },
            {
                path: '/products/:id',
                element: <ProductsShow />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin/users',
                element: <AdminUsers />,
            },
            {
                path: '/admin/products',
                element: <AdminProductsIndex />,
            },
            {
                path: '/admin/products/create',
                element: <AdminProductsCreate />,
            },
            {
                path: '/admin/products/:id/variants/create',
                element: <AdminVariantsCreate />,
            },
            {
                path: '/admin/variants/:id/edit',
                element: <AdminVariantsEdit />,
            },
            {
                path: '/admin/orders',
                element: <AdminOrdersIndex />,
            },
            {
                path: '/admin/orders/:uuid',
                element: <AdminOrdersShow />,
            },
            {
                path: '/admin/categories',
                element: <AdminCategoriesIndex />,
            },
            {
                path: '/admin/brands',
                element: <AdminBrandsIndex />,
            },
        ],
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

const queryClient = new QueryClient({
    defaultOptions: {
        staleTime: 5000,
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);
