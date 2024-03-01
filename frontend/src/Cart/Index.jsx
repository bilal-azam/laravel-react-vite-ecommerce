import { useEffect, useState } from 'react';
import axios from '../lib/axios.js';
import { useCart } from '../hooks/useCart.js';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Slide, toast, ToastContainer } from 'react-toastify';

function Index() {
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    const { mutate } = useCart();

    const getTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.variant.price * cartItem.quantity;
        }, 0);
    };

    const getCart = async () => {
        const response = await axios.get('api/cart');

        return response.data;
    };

    const {
        data: cartItems,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        refetchOnWindowFocus: true,
        refetchInterval: 5000,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleUpdateQuantity = async (cartId, event) => {
        setIsUpdating(true);
        try {
            await axios.post('api/cart/' + cartId + '/update-quantity', { event });
        } catch (error) {
            console.log(error);
        }
        await refetch();
        setIsUpdating(false);
        await mutate();
    };

    const removeFromCart = async (cartId) => {
        const response = await axios.delete('api/cart/' + cartId);

        if (response.data.success) {
            toast.success(response.data.message, {
                position: 'bottom-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Slide,
            });
        }

        await refetch();
        await mutate();
    };

    if (isPending) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!cartItems.length) {
        return (
            <div data-test="empty-cart" className="flex justify-center items-center max-w-7xl mx-auto">
                No products in cart...
            </div>
        );
    }

    const handleCheckout = async () => {
        if (!cartItems.length) {
            return;
        }

        try {
            await axios.post('api/orders');
            await mutate();
            await navigate('/products');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDiscount = (event) => {
        if (event.key === 'Enter') {
            alert('Discount code applied!');
        }
    };

    return (
        <div className="dark:text-black">
            <ToastContainer />
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cartItems.map((cartItem, index) => (
                        <div
                            data-test={'cart-item-' + index}
                            key={cartItem.id}
                            className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start relative"
                        >
                            <Link to={'/products/' + cartItem.variant.id}>
                                <img
                                    src={cartItem.variant.main_photo}
                                    alt={cartItem.variant.product.name}
                                    className="w-full rounded-lg sm:w-40"
                                />
                            </Link>
                            <div className="sm:ml-4 sm:flex sm:w-full justify-between">
                                <div className="mt-5 sm:mt-0 flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 ">
                                            {cartItem.variant.product.name}
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-700">
                                            {cartItem.option.size.name.toUpperCase()}
                                        </p>
                                    </div>
                                    <p className="mt-1 font-bold text-xl text-gray-900 sm:hidden">
                                        ${cartItem.variant.price}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-center sm:justify-between sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center border-gray-100">
                                        <button
                                            data-test="subtract-quantity"
                                            disabled={isUpdating || cartItem.quantity <= 1}
                                            onClick={() => handleUpdateQuantity(cartItem.id, 'subtract')}
                                            className={
                                                'cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50' +
                                                (cartItem.quantity <= 1 ? ' opacity-50 cursor-not-allowed' : '')
                                            }
                                        >
                                            -
                                        </button>
                                        <span data-test="quantity" className="p-2">
                                            {cartItem.quantity}
                                        </span>
                                        <button
                                            data-test="add-quantity"
                                            disabled={isUpdating}
                                            onClick={() => handleUpdateQuantity(cartItem.id, 'add')}
                                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div
                                        className="cursor-pointer text-sm text-red-500 hover:text-red-700 mt-2 hidden sm:block sm:mt-0"
                                        onClick={() => removeFromCart(cartItem.id)}
                                    >
                                        Remove
                                    </div>
                                    <div className="pt-6 font-bold text-xl hidden sm:block">
                                        ${cartItem.variant.price}
                                    </div>
                                </div>
                                <span
                                    className="cursor-pointer text-sm text-red-500 hover:text-red-700 block text-center mt-2 sm:hidden"
                                    onClick={() => removeFromCart(cartItem.id)}
                                >
                                    Remove
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:text-black">
                    <div className="mb-2">
                        <input
                            onKeyDown={handleDiscount}
                            type="text"
                            placeholder="Discount code"
                            className="input input-bordered input-primary w-full max-w-xs text-white"
                        />
                    </div>
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">${getTotalPrice()}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700 font-bold">Free</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">${getTotalPrice()}</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button
                        disabled={!cartItems.length}
                        onClick={handleCheckout}
                        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Index;
