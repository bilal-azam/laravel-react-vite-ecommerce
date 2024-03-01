import { useCallback, useEffect, useState } from 'react';
import axios from '../../lib/axios.js';
import { Link } from 'react-router-dom';

function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [page, setPage] = useState(1);

    const fetchOrders = useCallback(() => {
        axios
            .get('/api/admin/orders', {
                params: {
                    page,
                },
            })
            .then((response) => {
                setData(response.data);
                setOrders(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    function fetchStatuses() {
        axios
            .get('/api/admin/statuses')
            .then((response) => {
                setStatuses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChangeStatus = (id, status) => {
        axios
            .put(`/api/admin/orders/${id}/update-status`, { status })
            .then(() => {
                fetchOrders();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchOrders();
        fetchStatuses();
    }, [fetchOrders]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center max-w-7xl mx-auto">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!orders.length) {
        return <div className="flex justify-center items-center">No orders...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Items</th>
                        <th>Delivery</th>
                        <th>Order Placed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.uuid}</td>
                            <td>
                                <div>
                                    <div className="font-bold">{order.user.name}</div>
                                    <div className="text-sm opacity-50">{order.user.email}</div>
                                </div>
                            </td>
                            <td>
                                <select
                                    onChange={(event) => handleChangeStatus(order.id, event.target.value)}
                                    className="select select-bordered max-w-xs"
                                    value={order.status}
                                >
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>{order.items_count}</td>
                            <td>{order.shipment.name}</td>
                            <td>{order.created_at}</td>
                            <th>
                                <Link to={'/admin/orders/' + order.uuid} className="btn btn-info btn-outline btn-xs">
                                    Show
                                </Link>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="join grid grid-cols-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!data.prev_page_url}
                    className="join-item btn btn-outline"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!data.next_page_url}
                    className="join-item btn btn-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Index;
