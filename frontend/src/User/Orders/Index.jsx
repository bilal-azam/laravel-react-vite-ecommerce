import { useEffect, useState } from 'react';
import axios from '../../lib/axios.js';
import { Link } from 'react-router-dom';

function Index() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = () => {
        axios
            .get('api/orders')
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!orders.length) {
        return (
            <div data-test="no-products" className="flex justify-center items-center max-w-7xl mx-auto">
                There are no orders yet...
            </div>
        );
    }

    const getTotalPrice = (items) => {
        let price = 0;

        items.map((item) => {
            price += item.price;
        });

        return price;
    };

    return (
        <div>
            {orders.map((order) => {
                return (
                    <div key={order.id}>
                        <div className="text-primary pl-4 font-bold">{order.created_at}</div>
                        <Link to={'/orders/' + order.uuid}>
                            <div className="flex flex-col w-full border-opacity-50 mb-4">
                                <div className="grid card bg-base-300 rounded-box p-4">
                                    <div className="text-xl font-bold">${getTotalPrice(order.items)}</div>
                                    <div>Status: {order.status}</div>
                                    <div>Items: {order.items.length}</div>
                                    <div>Order No: {order.uuid}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Index;
