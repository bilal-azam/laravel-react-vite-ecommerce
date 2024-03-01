import { useCallback, useEffect, useState } from 'react';
import axios from '../../lib/axios.js';
import { Link, useParams } from 'react-router-dom';

function Show() {
    const uuid = useParams().uuid;
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrder = useCallback(() => {
        axios
            .get('api/orders/' + uuid)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [uuid]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div>
            {order.items.map((item) => (
                <div key={item.id} className="border-opacity-50 mb-4">
                    <Link to={'/products/' + item.option.variant.id} className="flex space-x-2 bg-base-300 rounded-xl">
                        <img className="w-36 rounded-l-xl" src={item.option.variant.main_photo} alt="" />
                        <div className="w-full">
                            <p>BRAND</p>
                            <p>{item.option.variant.product.name}</p>
                            <div className="flex justify-between space-x-2 pr-2">
                                <p>Size: {item.option.size.name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p className="font-bold">${item.price}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Show;
