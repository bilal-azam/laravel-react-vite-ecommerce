import { useEffect, useState } from 'react';
import axios from '../lib/axios.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavorites } from '../hooks/useFavorites.js';
import StarRating from '../components/StarRating.jsx';
import { useQuery } from '@tanstack/react-query';
import { Slide, toast, ToastContainer } from 'react-toastify';

function Show() {
    const id = useParams().id;
    const [size, setSize] = useState('');
    const [mainImage, setMainImage] = useState('');

    const navigate = useNavigate();

    const { user } = useAuth();
    const { mutate } = useCart();
    const { mutateFav } = useFavorites();

    async function handleRate(value) {
        if (!value) {
            return;
        }

        if (!user) {
            return navigate('/login');
        }

        if (confirm('Are you sure you want to rate this product?')) {
            try {
                await axios.post('/api/ratings', {
                    product_id: variant.product.id,
                    value: value,
                });
            } catch (error) {
                console.log(error);
            } finally {
                await refetch();
            }
        }
    }

    const getProduct = async () => {
        const response = await axios.get('api/products/' + id);

        setSize('');
        // setMainImage(response.data.data.main_photo);

        return response.data.data;
    };

    const {
        data: variant,
        isPending,
        isLoading,
        refetch,
        error,
    } = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
    });

    if (error) {
        console.log(error);
    }

    // const fetchProduct = useCallback(() => {
    //     axios
    //         .get("api/products/" + id)
    //         .then((res) => {
    //             setVariant(res.data.data)
    //             setSize("")
    //             setMainImage(res.data.data.images[0])
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }, [id])

    useEffect(() => {
        refetch();
    }, [refetch, id]);

    const addToCart = async () => {
        if (!user) {
            return navigate('/login');
        }

        if (!size) {
            toast.error('Please select a size first!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                // transition: Bounce,
            });
            // alert('Please select a size first')
            return;
        }

        try {
            const response = await axios.post('api/cart', {
                variant_id: variant.id,
                option_id: size,
            });

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
            } else {
                toast.error(response.data.message, {
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
        } catch (error) {
            console.log(error);
        }

        await mutate();
    };

    const handleAddFavorite = async () => {
        if (!user) {
            return navigate('/login');
        }

        try {
            await axios.post('api/favorites', {
                variant_id: variant.id,
            });
        } catch (error) {
            console.log(error);
        } finally {
            await refetch();
        }

        await mutateFav();
    };

    const handleRemoveFavorite = async (id) => {
        try {
            await axios.delete('api/favorites/' + id);
        } catch (error) {
            console.log(error);
        } finally {
            await refetch();
        }

        await mutateFav();
    };

    if (isPending || isLoading) {
        return (
            <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
            >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">{variant.product.name}</h1>

            <div className="carousel w-full h-64 rounded-xl lg:hidden">
                {variant.images.map((image, index, imagesArray) => (
                    <div key={index + 1} id={'slide' + (index + 1)} className="carousel-item relative w-full">
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href={'#slide' + (((index - 1 + imagesArray.length) % imagesArray.length) + 1)}
                                className="btn btn-circle"
                            >
                                ❮
                            </a>
                            <a href={'#slide' + (((index + 1) % imagesArray.length) + 1)} className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={'yellow'}
                            stroke={'orange'}
                            width={42}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-2xl font-bold">{variant.product.rating}</p>
                    </div>
                    {!variant.product.voted && (
                        <StarRating maxRating={5} size={24} onSetRating={handleRate} defaultRating={5} />
                    )}
                </div>
                <p className="p-4">{variant.product.description}</p>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-2">
                    {variant.product.variants.map((variant) => (
                        <Link
                            to={'/products/' + variant.id}
                            className={`btn btn-primary btn-outline` + (variant.id == id ? ' btn-active' : '')}
                            key={variant.id}
                            disabled={variant.id == id}
                        >
                            {variant.color.name}
                        </Link>
                    ))}
                </div>
                <div className="p-2 space-y-2">
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="select select-primary w-full text-lg mt-2"
                    >
                        <option value="" disabled>
                            Select Size
                        </option>
                        {variant.options.map((option) => (
                            <option key={option.id} value={option.id} disabled={option.quantity == 0}>
                                {option.size.name.toUpperCase()}
                                {option.quantity <= 3 && option.quantity > 1 ? ' - last items' : ''}
                                {option.quantity == 1 && ' - 1 item'}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center justify-between">
                        <p className="line-through text-error text-sm">${variant.product.price}</p>
                        <p className="text-success text-xl font-bold"> ${variant.price}</p>
                    </div>
                    <div className="mt-4 mb-4">
                        <button
                            onClick={addToCart}
                            data-test="add-to-cart"
                            className="btn btn-primary text-white font-bold rounded btn-md btn-block"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 hidden lg:block">
                <div className="grid grid-cols-10 gap-4">
                    <div>
                        {variant.images.map((image, index) => (
                            <img
                                onClick={() => setMainImage(image)}
                                key={index}
                                src={image}
                                alt={variant.product.name}
                                className="w-full h-auto object-cover mb-2 rounded-md cursor-pointer"
                            />
                        ))}
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="relative">
                                    {variant.favorite ? (
                                        <button
                                            onClick={() => handleRemoveFavorite(variant.favorite.id)}
                                            className="absolute top-2 right-2"
                                        >
                                            <FontAwesomeIcon
                                                className="text-error"
                                                icon="fa-solid fa-heart"
                                                size="2xl"
                                            />
                                        </button>
                                    ) : (
                                        <button onClick={handleAddFavorite} className="absolute top-2 right-2">
                                            <FontAwesomeIcon
                                                className="text-error"
                                                icon="fa-regular fa-heart"
                                                size="2xl"
                                            />
                                        </button>
                                    )}
                                    <img
                                        src={mainImage || variant.main_photo}
                                        alt={variant.product.name}
                                        className="w-full h-auto object-cover mb-2 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill={'yellow'}
                                            stroke={'orange'}
                                            width={42}
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <p className="text-2xl font-bold">{variant.product.rating}</p>
                                    </div>
                                    {!variant.product.voted && (
                                        <StarRating
                                            maxRating={5}
                                            size={24}
                                            onSetRating={handleRate}
                                            defaultRating={5}
                                        />
                                    )}
                                </div>
                                <p className="p-4">{variant.product.description}</p>
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-2">
                                    {variant.product.variants.map((variant) => (
                                        <Link
                                            to={'/products/' + variant.id}
                                            className={
                                                `btn btn-primary btn-outline` + (variant.id == id ? ' btn-active' : '')
                                            }
                                            key={variant.id}
                                            disabled={variant.id == id}
                                        >
                                            {variant.color.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="p-2 space-y-2">
                                    <select
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        className="select select-primary w-full text-lg mt-2"
                                    >
                                        <option value="" disabled>
                                            Select Size
                                        </option>
                                        {variant.options.map((option) => (
                                            <option key={option.id} value={option.id} disabled={option.quantity == 0}>
                                                {option.size.name.toUpperCase()}
                                                {option.quantity <= 3 && option.quantity > 1 ? ' - last items' : ''}
                                                {option.quantity == 1 && ' - 1 item'}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex items-center justify-between">
                                        <p className="line-through text-error text-sm">${variant.product.price}</p>
                                        <p className="text-success text-xl font-bold"> ${variant.price}</p>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <button
                                            onClick={addToCart}
                                            data-test="add-to-cart"
                                            className="btn btn-primary text-white font-bold rounded btn-md btn-block"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;
