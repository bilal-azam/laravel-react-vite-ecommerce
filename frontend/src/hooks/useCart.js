import axios from '../lib/axios.js';
import useSWR from 'swr';

export const useCart = () => {
    const {
        data: cartCount,
        error,
        mutate,
    } = useSWR('/api/cart-items', () => axios.get('/api/cart-items').then((res) => res.data));

    return { cartCount, mutate };
};
