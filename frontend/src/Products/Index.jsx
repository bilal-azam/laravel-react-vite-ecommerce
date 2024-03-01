import { useEffect, useState } from 'react';
import axios from '../lib/axios.js';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useFavorites } from '../hooks/useFavorites.js';
import { useAuth } from '../hooks/useAuth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

function Index() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('');

    const navigate = useNavigate();
    const { mutateFav } = useFavorites();
    const { user } = useAuth();

    const getProducts = async () => {
        const response = await axios.get('/api/products', {
            params: {
                category,
                brand,
                search: searchTerm,
                page,
                sortBy,
            },
        });

        return response.data;
    };

    const {
        data: products,
        isPending,
        refetch,
        error,
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        refetchInterval: 1000 * 10,
    });

    useEffect(() => {
        refetch();
    }, [refetch, category, brand, searchTerm, page, sortBy]);

    function fetchCategories() {
        axios
            .get('/api/admin/categories')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function fetchBrands() {
        axios
            .get('/api/admin/brands')
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
                <div className="skeleton w-96 h-96"></div>
            </div>
        );
    }

    const handleNextPage = () => {
        if (products.links.next) {
            setPage(page + 1);
            // setIsLoading(true);
        }
    };

    const handlePrevPage = () => {
        if (products.links.prev) {
            setPage(page - 1);
            // setIsLoading(true);
        }
    };

    const handleAddFavorite = async (variantId) => {
        if (!user) {
            return navigate('/login');
        }

        try {
            await axios.post('api/favorites', {
                variant_id: variantId,
            });
        } catch (error) {
            console.log(error);
        } finally {
            await refetch();
        }

        await mutateFav();
    };

    const handleRemoveFavorite = async (favoriteId) => {
        try {
            await axios.delete('api/favorites/' + favoriteId);
        } catch (error) {
            console.log(error);
        } finally {
            await refetch();
        }

        await mutateFav();
    };

    const handleSearchChange = debounce((event) => {
        setSearchTerm(event.target.value);
    }, 500);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="flex space-x-2">
                    <select
                        onChange={(event) => setSortBy(event.target.value)}
                        className="select select-primary max-w-xs"
                    >
                        <option value="">Sort by - Default</option>
                        <option value="price_asc">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                    </select>
                    <select
                        onChange={(event) => setCategory(event.target.value)}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option value="">Filter by Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(event) => setBrand(event.target.value)}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option value="">Filter by Brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered input-primary w-full lg:max-w-xs mt-2 md:mt-0 pl-12"
                    />
                </div>
            </div>
            {!products.data.length ? (
                <div data-test="no-products" className="flex justify-center items-center max-w-7xl mx-auto">
                    No products found...
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.data.map((variant, index) => (
                            <div key={variant.id} className="relative">
                                <Link
                                    to={'/products/' + variant.id}
                                    className="card bg-base-100 dark:bg-gray-200 shadow-xl hover:scale-105 transition-all duration-500 text-black"
                                >
                                    <figure>
                                        <img src={variant.main_photo} alt={variant.product.name} loading="lazy" />
                                    </figure>
                                    <div className="card-body">
                                        <div className="flex items-center justify-between">
                                            <h2 className="card-title">{variant.product.brand.name}</h2>
                                            <div>
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill={'yellow'}
                                                        stroke={'orange'}
                                                        width={24}
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <p className="font-bold text-sm">{variant.product.rating}</p>
                                                </div>
                                                <div className="text-xs">
                                                    {' '}
                                                    ({variant.product.ratings_count} reviews)
                                                </div>
                                            </div>
                                        </div>
                                        <p>{variant.product.name}</p>
                                        <p className="text-xl font-bold text-error">${variant.price}</p>
                                        <p className="text-sm">Lowest price: ${variant.lowest_price}</p>
                                        <p className="text-sm">Regular price: ${variant.product.price}</p>
                                    </div>
                                </Link>
                                {variant.favorite ? (
                                    <button
                                        onClick={() => handleRemoveFavorite(variant.favorite.id)}
                                        className="absolute top-2 right-2 z-10"
                                    >
                                        <FontAwesomeIcon className="text-error" icon="fa-solid fa-heart" size="2xl" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAddFavorite(variant.id)}
                                        className="absolute top-2 right-2 z-10"
                                    >
                                        <FontAwesomeIcon className="text-error" icon="fa-regular fa-heart" size="2xl" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 join w-full mt-4">
                        <button disabled={!products.links.prev} onClick={handlePrevPage} className="join-item btn">
                            «
                        </button>
                        <button className="join-item btn">Page {products.meta.current_page}</button>
                        <button disabled={!products.links.next} onClick={handleNextPage} className="join-item btn">
                            »
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Index;
