import { useEffect } from 'react';
import axios from '../lib/axios.js';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';
import { useQuery } from '@tanstack/react-query';

function Favorites() {
    const { mutateFav } = useFavorites();

    const getFavorites = async () => {
        const response = await axios.get('api/favorites');

        return response.data;
    };

    const {
        data: favorites,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!favorites.length) {
        return <div className="flex justify-center items-center max-w-7xl mx-auto">No favorites found...</div>;
    }

    const handleRemoveFavorite = (id) => {
        axios
            .delete('api/favorites/' + id)
            .then(() => {
                refetch();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(async () => {
                await mutateFav();
            });
    };

    return (
        <div>
            <div className="mb-2 text-xl font-bold text-center">Favorites</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="card bg-base-100 shadow-xl">
                        <div className="relative">
                            <button
                                onClick={() => handleRemoveFavorite(favorite.id)}
                                className="absolute right-1 top-1 text-error hover:ring-2 hover:ring-error hover:border-transparent w-6 rounded-full transition duration-300"
                            >
                                X
                            </button>
                            <img src={favorite.variant.main_photo} alt="Shoes" className="rounded-xl" loading="lazy" />
                        </div>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{favorite.variant.product.name}</h2>
                            <div>
                                <div className="line-through text-red-500 text-sm">${favorite.variant.price}</div>
                                <div className="text-green-500 text-xl font-bold">${favorite.variant.price}</div>
                            </div>
                            <Link to={'/products/' + favorite.variant.id} className="btn btn-primary w-full">
                                Buy Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
