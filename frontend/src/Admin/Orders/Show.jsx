import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../lib/axios.js';

function Show() {
    const uuid = useParams().uuid;
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState({});

    const fetchOrder = useCallback(() => {
        axios
            .get('/api/admin/orders/' + uuid)
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                console.log(error);
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
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img className="rounded-xl" src={item.option.variant.main_photo} width={100} alt="" />
                            </td>
                            <td>{item.option.variant.product.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Show;
