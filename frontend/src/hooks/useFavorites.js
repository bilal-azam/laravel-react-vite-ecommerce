import axios from '../lib/axios.js';
import useSWR from 'swr';

export const useFavorites = () => {
    const {
        data: favCount,
        error,
        mutate: mutateFav,
    } = useSWR('/api/favorites-count', () => axios.get('/api/favorites-count').then((res) => res.data));

    return { favCount, mutateFav };
};
